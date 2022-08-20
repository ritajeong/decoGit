package keeper

import (
	"decogit/x/decogit/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetSticker set a specific sticker in the store from its index
func (k Keeper) SetSticker(ctx sdk.Context, sticker types.Sticker) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StickerKeyPrefix))
	b := k.cdc.MustMarshal(&sticker)
	store.Set(types.StickerKey(
		sticker.Index,
	), b)
}

// GetSticker returns a sticker from its index
func (k Keeper) GetSticker(
	ctx sdk.Context,
	index string,

) (val types.Sticker, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StickerKeyPrefix))

	b := store.Get(types.StickerKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveSticker removes a sticker from the store
func (k Keeper) RemoveSticker(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StickerKeyPrefix))
	store.Delete(types.StickerKey(
		index,
	))
}

// GetAllSticker returns all sticker
func (k Keeper) GetAllSticker(ctx sdk.Context) (list []types.Sticker) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StickerKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Sticker
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
