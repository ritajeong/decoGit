import React, { ReactNode, useContext, useState } from "react";
import SnackbarProviderLayout from "./SnackbarProviderLayout";

export type SnackbarSeverity = "info" | "warn" | "error" | "success";

export interface SnackbarItem {
  message: string | ReactNode;
  severity?: SnackbarSeverity;
  persist?: boolean;
}

export interface SnackbarContextType {
  enqueue: (item: SnackbarItem) => number;
  update: (id: number, item: SnackbarItem) => void;
  dequeue: (id: number) => void;
}

export const SnackbarContext = React.createContext<SnackbarContextType>(null as unknown as SnackbarContextType);

export interface SnackbarItemState {
  id: number;
  value: SnackbarItem;
}

export const SnackbarProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [idCounter, setIdCounter] = useState<number>(0);
  const [items, setItems] = useState<SnackbarItemState[]>([]);

  const enqueue = (item: SnackbarItem) => {
    setItems((prevItems) => [...prevItems, { id: idCounter, value: item }]);
    setIdCounter((prevCounter) => prevCounter + 1);
    return idCounter;
  };

  const update = (id: number, item: SnackbarItem) => {
    setItems((prevItems) =>
      [...prevItems.filter((i) => i.id !== id), { id: idCounter, value: item }].sort((a, b) => a.id - b.id),
    );
  };

  const dequeue = (id: number) => {
    setItems((prevItems) => [...prevItems.filter((i) => i.id !== id)]);
  };

  return (
    <SnackbarContext.Provider value={{ enqueue, dequeue, update }}>
      {props.children}
      <SnackbarProviderLayout items={items} dequeue={dequeue} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
