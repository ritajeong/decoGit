package decogit

import (
	"decogit/x/decogit/keeper"
	"decogit/x/decogit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the sticker
	for _, elem := range genState.StickerList {
		k.SetSticker(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.StickerList = k.GetAllSticker(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
