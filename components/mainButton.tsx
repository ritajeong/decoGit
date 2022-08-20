import React, { PropsWithChildren } from "react";

interface Props {
  onClick?: () => void;
}

export const MainButton: React.FC<PropsWithChildren<Props>> = (props) => {
  return (
    <>
      <button className="border-4 border-[#ffffff] p-4 relative group" onClick={props.onClick}>
        <div className="absolute w-full h-full bg-white left-0 top-0 scale-x-0 group-hover:scale-x-100 transition-all origin-left"></div>
        <div className="relative">{props.children}</div>
      </button>
    </>
  );
};
