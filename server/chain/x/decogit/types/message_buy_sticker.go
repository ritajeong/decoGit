package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgBuySticker = "buy_sticker"

var _ sdk.Msg = &MsgBuySticker{}

func NewMsgBuySticker(creator string, sticker string, bid string) *MsgBuySticker {
	return &MsgBuySticker{
		Creator: creator,
		Sticker: sticker,
		Bid:     bid,
	}
}

func (msg *MsgBuySticker) Route() string {
	return RouterKey
}

func (msg *MsgBuySticker) Type() string {
	return TypeMsgBuySticker
}

func (msg *MsgBuySticker) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgBuySticker) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgBuySticker) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
