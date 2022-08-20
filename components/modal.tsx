import styled from "@emotion/styled";
import { transparentize } from "polished";
import React, { PropsWithChildren, useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

// Moal code brought from solved.ac

interface ModalContainerProps {
  open: boolean;
  displayChildren: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${({ displayChildren: display }) => (display ? "block" : "none")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000000;
  overflow: hidden;
  pointer-events: ${({ open }) => (open ? "all" : "none")};
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${transparentize(0.5, "white")};
  backdrop-filter: blur(2px);
`;

interface ModalContentsProps {
  open: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  height?: number;
  width?: number;
}

const ModalContents = styled.div<ModalContentsProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width, fullWidth }) => (width === undefined ? "100%" : `${width}px`)};
  height: ${({ height, fullHeight }) => (fullHeight ? "100%" : height === undefined ? "auto" : `${height}px`)};
  max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "1200px")};
  max-height: 100%;
  margin: 0 auto;
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0.9)")};
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease;
  overflow: hidden;
  border-radius: 16px;
`;

interface ModalTitleProps {
  backgroundFill: boolean;
}

const ModalTitle = styled.div<ModalTitleProps>`
  display: flex;
  align-items: center;
  height: ${({ backgroundFill }) => (backgroundFill ? "48px" : "0")};
  padding: 0 16px;
  flex-shrink: 0;
  background-color: ${({ backgroundFill }) => (backgroundFill ? "white" : "transparent")};
`;

const ModalCloseIcon = styled.span`
  color: #929292;
  font-size: 2rem;
  vertical-align: top;
  cursor: pointer;
  user-select: none;
  z-index: 1020000;
`;

const ModalTitleText = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 8px;
`;

interface Props {
  title?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
  height?: number;
  width?: number;
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  recieveClicks: boolean;
  display: boolean;
  contentHeight?: number;
  windowHeight?: number;
}

const Modal: React.FC<PropsWithChildren<Props>> = (props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const [state, setState] = useState<State>({
    recieveClicks: props.isOpen,
    display: props.isOpen,
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      const html = document.querySelector("html");
      if (html !== null) {
        if (props.isOpen) {
          html.style.overflowY = "hidden";
        } else {
          html.style.overflowY = "unset";
        }
      }
    }

    if (props.isOpen) {
      setState((prevState) => ({
        ...prevState,
        display: true,
      }));
      const timer = setTimeout(() => {
        setState((prevState) => ({ ...prevState, recieveClicks: true }));
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setState((prevState) => ({ ...prevState, recieveClicks: false }));
      const timer = setTimeout(() => {
        setState((prevState) => ({ ...prevState, display: false }));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [props.isOpen]);

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        const html = document.querySelector("html");
        if (html !== null) {
          html.style.overflowY = "unset";
        }
      }
    };
  }, []);

  const children = (
    <ModalContainer open={state.recieveClicks} displayChildren={state.display}>
      {state.display ? (
        <>
          <ModalBackdrop onClick={props.onClose} />
          <ModalContents
            open={state.recieveClicks}
            fullWidth={props.fullWidth}
            fullHeight={props.fullHeight}
            width={props.width}
            height={props.height}
          >
            <ModalTitle backgroundFill={props.title !== undefined}>
              {props.title ? <ModalTitleText>{props.title}</ModalTitleText> : null}
              <div style={{ flex: "1 0 0" }} />
              <ModalCloseIcon onClick={props.onClose}>
                <IoCloseOutline size={32} color="#929292" />
              </ModalCloseIcon>
            </ModalTitle>
            <div style={props.fullHeight ? { flex: "1 0 0", minHeight: 0 } : undefined}>{props.children}</div>
          </ModalContents>
        </>
      ) : null}
    </ModalContainer>
  );
  return mounted ? ReactDOM.createPortal(children, document.body, "modal") : null;
};

export default Modal;
