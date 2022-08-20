package keeper

import (
	"context"

	"decogit/x/decogit/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetMyStickers(goCtx context.Context, req *types.QueryGetMyStickersRequest) (*types.QueryGetMyStickersResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var stickers []types.Sticker
	ctx := sdk.UnwrapSDKContext(goCtx)

	store := ctx.KVStore(k.storeKey)
	stickerStore := prefix.NewStore(store, types.KeyPrefix(types.StickerKeyPrefix))

	pageRes, err := query.Paginate(stickerStore, req.Pagination, func(key []byte, value []byte) error {
		var sticker types.Sticker
		if err := k.cdc.Unmarshal(value, &sticker); err != nil {
			return err
		}

		stickers = append(stickers, sticker)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	// Return a struct containing a list of posts and pagination info
	return &types.QueryGetMyStickersResponse{Sticker: stickers, Pagination: pageRes}, nil

}
