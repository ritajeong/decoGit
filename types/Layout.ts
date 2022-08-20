import { Sticker } from "./Sticker";

export type LaptopColor = "white" | "pink" | "silver" | "slate";

export type LaptopManufacturer = "Cupertino" | "Redmond" | "Texas";

export interface Laptop {
  color: LaptopColor;
  manufacturer: LaptopManufacturer;
}

export interface StickerPosition {
  sticker: Sticker;
  // Pixel width of a sticker; its height should be inferred from sticker size
  width: number;
  // Center coordinates of a sticker
  x: number;
  y: number;
  // Rotation, by degrees
  rotate: number;
}

export interface LaptopLayout {
  laptop: Laptop;
  // Z-indices of the stickers should be same as array indices
  stickers: StickerPosition[];
}
