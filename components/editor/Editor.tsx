import { CSSProperties, MouseEventHandler, useMemo, useRef, useState } from "react";
import { LaptopLayout } from "../../types/Layout";
import { Sticker } from "../../types/Sticker";
import { clientToSVGPosition } from "../../utils/svg";
import { OptionalOf } from "../../utils/types";
import EditorClipPath from "./EditorClipPath";
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
  currentSticker?: Sticker | null;
  laptopHeight?: number;
  laptopWidth?: number;
  stickerDefaultRatio?: number;
  editable?: boolean;
  style?: CSSProperties;
  state: LaptopLayout;
  onStateChange: (newState: LaptopLayout) => void;
}

const defaultProps: Required<OptionalOf<Props>> = {
  currentSticker: null,
  laptopHeight: 160,
  laptopWidth: 256,
  stickerDefaultRatio: 0.4,
  editable: true,
  style: {},
};

const Editor: React.FC<Props> = (props) => {
  const {
    currentSticker,
    laptopHeight,
    laptopWidth,
    stickerDefaultRatio,
    state: layout,
    style,
    editable,
  } = { ...defaultProps, ...props };
  const svgRef = useRef<SVGSVGElement>(null);
  const [ghostShown, setGhostShown] = useState<boolean>(false);
  const [ghostPosition, setGhostPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  const { laptop, stickers } = layout;

  const renderStickers = useMemo(() => [manufacturerLogo[laptop.manufacturer], ...stickers], [laptop, stickers]);

  const handleClick: MouseEventHandler<SVGSVGElement> = (e) => {
    if (!svgRef.current || !editable) return;
    if (!currentSticker) return;
    const { x, y } = clientToSVGPosition(e.clientX, e.clientY, svgRef.current);
    const relativeX = x / laptopWidth;
    const relativeY = y / laptopHeight;

    props.onStateChange({
      ...layout,
      stickers: [
        ...stickers,
        {
          sticker: currentSticker,
          scale: stickerDefaultRatio,
          x: relativeX,
          y: relativeY,
          rotate: 0,
        },
      ],
    });
  };

  const handleMouseEvent: MouseEventHandler<SVGSVGElement> = (e) => {
    if (!svgRef.current || !editable) return;
    const { x, y } = clientToSVGPosition(e.clientX, e.clientY, svgRef.current);
    const relativeX = x / laptopWidth;
    const relativeY = y / laptopHeight;
    setGhostPosition({ x: relativeX, y: relativeY });
  };

  return (
    <EditorContext.Provider value={{ laptopHeight, laptopWidth }}>
      <svg
        style={{ ...(editable && currentSticker ? { cursor: "crosshair" } : {}), ...style }}
        onClick={handleClick}
        onMouseEnter={() => setGhostShown(true)}
        onMouseLeave={() => setGhostShown(false)}
        onMouseMove={handleMouseEvent}
        ref={svgRef}
        viewBox={`0 0 ${laptopWidth} ${laptopHeight}`}
      >
        <defs>
          <EditorClipPath />
        </defs>
        <g clip-path="url(#shape)">
          <image href={`/assets/laptop/laptop-${laptop.color}.svg`} width={laptopWidth} height={laptopHeight} />
          {renderStickers.map((sticker, i) => (
            <StickerElement position={sticker} key={i.toString()} />
          ))}
          {editable && ghostShown && currentSticker ? (
            <g opacity={0.5}>
              <StickerElement
                position={{
                  ...ghostPosition,
                  sticker: currentSticker,
                  scale: stickerDefaultRatio,
                  rotate: 0,
                }}
              />
            </g>
          ) : null}
        </g>
      </svg>
    </EditorContext.Provider>
  );
};

export default Editor;
