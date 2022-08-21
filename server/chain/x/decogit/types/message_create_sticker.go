package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateSticker = "create_sticker"

var _ sdk.Msg = &MsgCreateSticker{}

func NewMsgCreateSticker(creator string, sticker string, price string) *MsgCreateSticker {
	return &MsgCreateSticker{
		Creator: creator,
		Sticker: sticker,
		Price:   price,
	}
}

func (msg *MsgCreateSticker) Route() string {
	return RouterKey
}

func (msg *MsgCreateSticker) Type() string {
	return TypeMsgCreateSticker
}

func (msg *MsgCreateSticker) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateSticker) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateSticker) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
