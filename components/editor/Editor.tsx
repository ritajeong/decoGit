import { CSSProperties, HTMLAttributes, MouseEventHandler, useEffect, useMemo, useRef } from "react";
import { LaptopLayout, StickerPosition } from "../../types/Layout";
import { Sticker } from "../../types/Sticker";
import { clientToSVGPosition } from "../../utils/svg";
import { OptionalOf } from "../../utils/types";
import EditorContext from "./EditorContext";
import StickerElement from "./StickerElement";

const sampleSticker: Sticker = {
  id: "python",
  alt: "Python",
  url: "sticker/python.svg",
  originalHeight: 153,
  originalWidth: 153,
};

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
  const {
    laptopHeight,
    laptopWidth,
    stickerDefaultRatio,
    state: layout,
    style,
    ...rest
  } = { ...defaultProps, ...props };
  const svgRef = useRef<SVGSVGElement>(null);

  const { laptop, stickers } = layout;

  const renderStickers = useMemo(() => [manufacturerLogo[laptop.manufacturer], ...stickers], [laptop, stickers]);

  const handleClick: MouseEventHandler<SVGSVGElement> = (e) => {
    if (!svgRef.current) return;
    const { x, y } = clientToSVGPosition(e.pageX, e.pageY, svgRef.current);
    const relativeX = x / laptopWidth;
    const relativeY = y / laptopHeight;

    props.onStateChange({
      ...layout,
      stickers: [
        ...stickers,
        {
          sticker: sampleSticker,
          scale: stickerDefaultRatio,
          x: relativeX,
          y: relativeY,
          rotate: 0,
        },
      ],
    });
  };

  return (
    <EditorContext.Provider value={{ laptopHeight, laptopWidth }}>
      <svg style={style} onClick={handleClick} ref={svgRef} viewBox={`0 0 ${laptopWidth} ${laptopHeight}`}>
        <image href={`/assets/laptop/laptop-${laptop.color}.svg`} width={laptopWidth} height={laptopHeight} />
        {renderStickers.map((sticker, i) => (
          <StickerElement position={sticker} key={i.toString()} />
        ))}
      </svg>
    </EditorContext.Provider>
  );
};

export default Editor;
