package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// StickerKeyPrefix is the prefix to retrieve all Sticker
	StickerKeyPrefix = "Sticker/value/"
)

// StickerKey returns the store key to retrieve a Sticker from the index fields
func StickerKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
