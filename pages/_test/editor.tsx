import { NextPage } from "next";
import { useState } from "react";
import Editor from "../../components/editor/Editor";
import { Laptop, LaptopLayout } from "../../types/Layout";
import { Sticker } from "../../types/Sticker";

const sampleSticker: Sticker = {
  id: "python",
  alt: "Python",
  url: "sticker/python.svg",
  originalHeight: 153,
  originalWidth: 153,
};

const sampleLaptop: Laptop = {
  color: "white",
  manufacturer: "Texas",
};

const TestEditor: NextPage = () => {
  const [editorState, setEditorState] = useState<LaptopLayout>({
    laptop: sampleLaptop,
    stickers: [],
  });

  return (
    <>
      <div className="p-16">
        <h1 className="text-xl">Editor test</h1>
        <Editor state={editorState} onStateChange={setEditorState} style={{ width: 512, height: 320 }} />
      </div>
    </>
  );
};

export default TestEditor;
