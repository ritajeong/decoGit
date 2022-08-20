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

func (k Keeper) StickerAll(c context.Context, req *types.QueryAllStickerRequest) (*types.QueryAllStickerResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var stickers []types.Sticker
	ctx := sdk.UnwrapSDKContext(c)

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

	return &types.QueryAllStickerResponse{Sticker: stickers, Pagination: pageRes}, nil
}

func (k Keeper) Sticker(c context.Context, req *types.QueryGetStickerRequest) (*types.QueryGetStickerResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetSticker(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetStickerResponse{Sticker: val}, nil
}
