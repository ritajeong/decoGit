package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		StickerList: []Sticker{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in sticker
	stickerIndexMap := make(map[string]struct{})

	for _, elem := range gs.StickerList {
		index := string(StickerKey(elem.Index))
		if _, ok := stickerIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for sticker")
		}
		stickerIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
