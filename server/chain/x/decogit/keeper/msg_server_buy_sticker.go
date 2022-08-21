package keeper

import (
	"context"

	"decogit/x/decogit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/google/uuid"
)

func (k msgServer) BuySticker(goCtx context.Context, msg *types.MsgBuySticker) (*types.MsgBuyStickerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	// Try getting a name from the store
	Sticker, isFound := k.GetSticker(ctx, msg.StickerId)


	// Convert price and bid strings to sdk.Coins
	price, _ := sdk.ParseCoinsNormalized(Sticker.Price)
	bid, _ := sdk.ParseCoinsNormalized(msg.Bid)

	// Convert owner and buyer address strings to sdk.AccAddress
	owner, _ := sdk.AccAddressFromBech32(Sticker.Owner)
	buyer, _ := sdk.AccAddressFromBech32(msg.Creator)

	// If a stickerId is found in store
	if isFound {
		// If the current price is higher than the bid
		if price.IsAllGT(bid) {
			// Throw an error
			return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Bid is not high enough")
		}

		// Otherwise (when the bid is higher), send tokens from the buyer to the owner
		k.bankKeeper.SendCoins(ctx, buyer, owner, bid)

	} else { // If the stickerId is not found in the store
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "stickerId is not found in the store")
		// Set the price at which the name has to be bought if it didn't have an owner before
		// minPrice := sdk.Coins{sdk.NewInt64Coin("DECO", 10)}
		// Otherwise (when the bid is higher), send tokens from the buyer's account to the module's account (as a payment for the name)
		// k.bankKeeper.SendCoinsFromAccountToModule(ctx, buyer, types.ModuleName, bid)
	}

	id := uuid.New().String()

	// Create an updated Sticker record
	newSticker := types.Sticker{
		Index: id,
		Name:  Sticker.Name,
		Price: bid.String(),
		Owner: buyer.String(),
	}

	// Write Sticker information to the store
	k.SetSticker(ctx, newSticker)
	return &types.MsgBuyStickerResponse{}, nil
}
