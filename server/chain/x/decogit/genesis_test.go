package decogit_test

import (
	"testing"

	keepertest "decogit/testutil/keeper"
	"decogit/testutil/nullify"
	"decogit/x/decogit"
	"decogit/x/decogit/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		StickerList: []types.Sticker{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.DecogitKeeper(t)
	decogit.InitGenesis(ctx, *k, genesisState)
	got := decogit.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.StickerList, got.StickerList)
	// this line is used by starport scaffolding # genesis/test/assert
}
