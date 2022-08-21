import { createContext, useContext } from "react";

export interface EditorContextValues {
  laptopHeight: number;
  laptopWidth: number;
}

const EditorContext = createContext<EditorContextValues>({ laptopHeight: 256, laptopWidth: 160 });

export default EditorContext;

export const useEditorContext = () => useContext(EditorContext);


