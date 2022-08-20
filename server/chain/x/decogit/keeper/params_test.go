package keeper_test

import (
	"testing"

	testkeeper "decogit/testutil/keeper"
	"decogit/x/decogit/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.DecogitKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
