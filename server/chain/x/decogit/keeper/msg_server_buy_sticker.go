package keeper

import (
	"context"

	"decogit/x/decogit/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) BuySticker(goCtx context.Context, msg *types.MsgBuySticker) (*types.MsgBuyStickerResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	// Try getting a name from the store
	Sticker, isFound := k.GetSticker(ctx, msg.Sticker)

	// Set the price at which the name has to be bought if it didn't have an owner before
	minPrice := sdk.Coins{sdk.NewInt64Coin("DECO", 10)}

	// Convert price and bid strings to sdk.Coins
	price, _ := sdk.ParseCoinsNormalized(Sticker.Price)
	bid, _ := sdk.ParseCoinsNormalized(msg.Bid)

	// Convert owner and buyer address strings to sdk.AccAddress
	owner, _ := sdk.AccAddressFromBech32(Sticker.Owner)
	buyer, _ := sdk.AccAddressFromBech32(msg.Creator)

	// If a name is found in store
	if isFound {
		// If the current price is higher than the bid
		if price.IsAllGT(bid) {
			// Throw an error
			return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Bid is not high enough")
		}

		// Otherwise (when the bid is higher), send tokens from the buyer to the owner
		k.bankKeeper.SendCoins(ctx, buyer, owner, bid)
	} else { // If the name is not found in the store
		// If the minimum price is higher than the bid
		if minPrice.IsAllGT(bid) {
			// Throw an error
			return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Bid is less than min amount")
		}

		// Otherwise (when the bid is higher), send tokens from the buyer's account to the module's account (as a payment for the name)
		k.bankKeeper.SendCoinsFromAccountToModule(ctx, buyer, types.ModuleName, bid)
	}

	// Create an updated Sticker record
	newSticker := types.Sticker{
		Index: msg.Sticker,
		Name:  msg.Sticker,
		Price: bid.String(),
		Owner: buyer.String(),
	}

	// Write Sticker information to the store
	k.SetSticker(ctx, newSticker)
	return &types.MsgBuyStickerResponse{}, nil
}
