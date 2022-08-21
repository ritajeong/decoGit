package keeper

import (
	"context"

	"decogit/x/decogit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/google/uuid"
)

func (k msgServer) CreateSticker(goCtx context.Context, msg *types.MsgCreateSticker) (*types.MsgCreateStickerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	id := uuid.New().String()


	newSticker := types.Sticker{
		Index: id,
		Name:  msg.Sticker,
		Price: msg.Price,
		Owner: "",
	}

	// Write Sticker information to the store
	k.SetSticker(ctx, newSticker)

	return &types.MsgCreateStickerResponse{Id: id}, nil
}
