package keeper_test

import (
	"context"
	"testing"

	keepertest "decogit/testutil/keeper"
	"decogit/x/decogit/keeper"
	"decogit/x/decogit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.DecogitKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
