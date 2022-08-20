package keeper_test

import (
	"strconv"
	"testing"

	keepertest "decogit/testutil/keeper"
	"decogit/testutil/nullify"
	"decogit/x/decogit/keeper"
	"decogit/x/decogit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNSticker(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Sticker {
	items := make([]types.Sticker, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetSticker(ctx, items[i])
	}
	return items
}

func TestStickerGet(t *testing.T) {
	keeper, ctx := keepertest.DecogitKeeper(t)
	items := createNSticker(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetSticker(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestStickerRemove(t *testing.T) {
	keeper, ctx := keepertest.DecogitKeeper(t)
	items := createNSticker(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveSticker(ctx,
			item.Index,
		)
		_, found := keeper.GetSticker(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestStickerGetAll(t *testing.T) {
	keeper, ctx := keepertest.DecogitKeeper(t)
	items := createNSticker(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllSticker(ctx)),
	)
}
