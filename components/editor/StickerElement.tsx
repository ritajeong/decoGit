import { StickerPosition } from "../../types/Layout";
import { useEditorContext } from "./EditorContext";

interface Props {
  position: StickerPosition;
}
const StickerElement: React.FC<Props> = (props) => {
  const { laptopHeight, laptopWidth } = useEditorContext();
  const { sticker, x, y, rotate, scale } = props.position;

  const imageWidth = scale * sticker.originalWidth;
  const imageHeight = scale * sticker.originalHeight;

  return (
    <image
      href={`/assets/${sticker.url}`}
      x={x * laptopWidth - imageWidth / 2}
      y={y * laptopHeight - imageHeight / 2}
    />
  );
};

export default StickerElement;
