import { CSSProperties, HTMLAttributes, useEffect, useMemo, useRef } from "react";
import { LaptopLayout, StickerPosition } from "../../types/Layout";
import { OptionalOf } from "../../utils/types";
import EditorContext from "./EditorContext";
import StickerElement from "./StickerElement";

const manufacturerLogoBase = {
  x: 0.5,
  y: 0.5,
  scale: 1,
  rotate: 0,
} as const;

const manufacturerLogo = {
  Redmond: {
    ...manufacturerLogoBase,
    sticker: {
      id: "redmond",
      alt: "Redmond",
      url: "manufacturer/logo-redmond.svg",
      originalHeight: 55,
      originalWidth: 55,
    },
  },
  Cupertino: {
    ...manufacturerLogoBase,
    sticker: {
      id: "cupertino",
      alt: "Cupertino",
      url: "manufacturer/logo-cupertino.svg",
      originalHeight: 54,
      originalWidth: 56,
    },
  },
  Texas: {
    ...manufacturerLogoBase,
    sticker: {
      id: "texas",
      alt: "Texas",
      url: "manufacturer/logo-texas.svg",
      originalHeight: 65,
      originalWidth: 65,
    },
  },
} as const;

interface Props {
  laptopHeight?: number;
  laptopWidth?: number;
  stickerDefaultRatio?: number;
  style?: CSSProperties;
  state: LaptopLayout;
  onStateChange: (newState: LaptopLayout) => void;
}

const defaultProps: Required<OptionalOf<Props>> = {
  laptopHeight: 160,
  laptopWidth: 256,
  stickerDefaultRatio: 0.4,
  style: {},
};

const Editor: React.FC<Props> = (props) => {
  const { laptopHeight, laptopWidth, state: layout, style, ...rest } = { ...defaultProps, ...props };
  const svgRef = useRef<SVGSVGElement>(null);

  const { laptop, stickers } = layout;

  const renderStickers = useMemo(() => [manufacturerLogo[laptop.manufacturer], ...stickers], [laptop, stickers]);

  return (
    <EditorContext.Provider value={{ laptopHeight, laptopWidth }}>
      <svg style={style} ref={svgRef} viewBox={`0 0 ${laptopWidth} ${laptopHeight}`}>
        <image href={`/assets/laptop/laptop-${laptop.color}.svg`} width={laptopWidth} height={laptopHeight} />
        {laptop.manufacturer === "Cupertino" ? (
          <image href={`/assets/laptop/laptop-${laptop.color}.svg`} width={laptopWidth} height={laptopHeight} />
        ) : null}
        {renderStickers.map((sticker) => (
          <StickerElement position={sticker} key={sticker.sticker.id} />
        ))}
      </svg>
    </EditorContext.Provider>
  );
};

export default Editor;
