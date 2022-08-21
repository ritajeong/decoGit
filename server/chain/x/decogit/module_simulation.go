package decogit

import (
	"math/rand"

	"decogit/testutil/sample"
	decogitsimulation "decogit/x/decogit/simulation"
	"decogit/x/decogit/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = decogitsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgBuySticker = "op_weight_msg_buy_sticker"
	// TODO: Determine the simulation weight value
	defaultWeightMsgBuySticker int = 100

	opWeightMsgCreateSticker = "op_weight_msg_create_sticker"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateSticker int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	decogitGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&decogitGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgBuySticker int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgBuySticker, &weightMsgBuySticker, nil,
		func(_ *rand.Rand) {
			weightMsgBuySticker = defaultWeightMsgBuySticker
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgBuySticker,
		decogitsimulation.SimulateMsgBuySticker(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCreateSticker int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateSticker, &weightMsgCreateSticker, nil,
		func(_ *rand.Rand) {
			weightMsgCreateSticker = defaultWeightMsgCreateSticker
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateSticker,
		decogitsimulation.SimulateMsgCreateSticker(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
