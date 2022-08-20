import React, { PropsWithChildren } from "react";

interface Props {
  onClick?: () => void;
}

export const MainButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <>
      <button className="border-4 border-[#ffffff] hover:bg-white p-4" onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
};
