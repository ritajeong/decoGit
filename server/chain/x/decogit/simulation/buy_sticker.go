package simulation

import (
	"math/rand"

	"decogit/x/decogit/keeper"
	"decogit/x/decogit/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgBuySticker(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgBuySticker{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the BuySticker simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "BuySticker simulation not implemented"), nil, nil
	}
}
