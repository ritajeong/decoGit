import { NextPage } from "next";
import { useState } from "react";
import Editor from "../../components/editor/Editor";
import { Laptop, LaptopLayout } from "../../types/Layout";
import { Sticker } from "../../types/Sticker";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";

const sampleLaptop: Laptop = {
  color: "white",
  manufacturer: "Texas",
};

const TestEditor: NextPage = () => {
  const [editorState, setEditorState] = useState<LaptopLayout>({
    laptop: sampleLaptop,
    stickers: [],
  });
  const [editable, setEditable] = useState<boolean>(true);

  return (
    <>
      <div className="p-16">
        <h1 className="text-xl">Editor test</h1>
        <Editor
          state={editorState}
          onStateChange={setEditorState}
          editable={editable}
          style={{ width: 512, height: 320 }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 flex items-center gap-1 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEditable((p) => !p)}
        >
          {editable ? <IoLockOpen /> : <IoLockClosed />}
          {editable ? "Unlocked (click to lock)" : "Locked (click to unlock)"}
        </button>
      </div>
    </>
  );
};

export default TestEditor;
