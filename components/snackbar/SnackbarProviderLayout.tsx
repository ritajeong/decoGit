import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import _ from "lodash";
import { transparentize } from "polished";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  IoCheckmarkCircleOutline,
  IoClose,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
  IoRefreshCircleOutline,
  IoWarningOutline
} from "react-icons/io5";
import { SnackbarItem, SnackbarItemState, SnackbarSeverity } from "./SnackbarContext";

// Moal code brought from solved.ac

const APPEAR_DURATION = 500;
const DISAPPEAR_DURATION = 500;
const PERSIST_DURATION = 5000;

type AnimationPhase = "request-creation" | "creating" | "created" | "destroying";

const SnackbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 4vh;
  z-index: 2000000;
  overflow: hidden;
  pointer-events: none;
`;

const SnackbarWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 600px;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
`;

interface SnackbarItemContainerProps {
  themeColor: string;
  phase: AnimationPhase;
}

const SnackbarItemContainer = styled.div<SnackbarItemContainerProps>`
  width: 100%;
  display: flex;
  padding: 8px;
  background: white;
  border-radius: 4px;
  box-shadow: ${({ themeColor }) => transparentize(0.6, themeColor)} 0px 8px 16px;
  align-items: center;
  transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  transform-origin: bottom;
  transform: ${({ phase }) =>
    phase === "destroying" || phase === "request-creation"
      ? "scale(0.8) translate(0, 8px)"
      : "scale(1) translate(0, 0)"};
  opacity: ${({ phase }) => (phase === "destroying" || phase === "request-creation" ? 0 : 1)};
  pointer-events: all;
`;

const SnackbarItemPositioner = styled.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  transition: transform 0.3s ease;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface SnackbarIconContainerProps {
  themeColor: string;
  rotateAnimation?: boolean;
}

const SnackbarIconContainer = styled.div<SnackbarIconContainerProps>`
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 32px;
  transition: color 0.3s ease;
  animation: ${({ rotateAnimation: rotate }) =>
    rotate
      ? css`
          ${rotateAnimation} 1s infinite linear
        `
      : "unset"};
  color: ${({ themeColor }) => themeColor};
`;

const SnackbarContentsContainer = styled.div`
  flex: 1 0 0;
  padding-left: 8px;
`;

const snackbarIcon = (severity: SnackbarSeverity) => {
  if (severity === "info") return <IoInformationCircleOutline />;
  if (severity === "warn") return <IoWarningOutline />;
  if (severity === "error") return <IoCloseCircleOutline />;
  if (severity === "success") return <IoCheckmarkCircleOutline />;
  if (severity === "updating") return <IoRefreshCircleOutline />;
  if (severity === "rare" || severity === "epic" || severity === "legendary") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`https://static.solved.ac/tier_small/item-${severity}.svg`} style={{ height: "1em" }} alt={severity} />
    );
  }

  return <IoInformationCircleOutline />;
};

const useSnackbarColor = (severity: SnackbarSeverity) => {
  if (severity === "info") return "#393a3b";
  if (severity === "warn") return "#ee890e";
  if (severity === "error") return "#ee0e33";
  if (severity === "success") return "#17b108";
  return "#393a3b";
};

interface SnackbarItemProps {
  item: SnackbarItem;
  phase: AnimationPhase;
  position: number;
  dequeue?: () => void;
}

const SnackbarItemDisplay = React.forwardRef<HTMLDivElement, SnackbarItemProps>((props, ref) => {
  const { item, phase, position } = props;

  const icon = snackbarIcon(item.severity ?? "info");
  const color = useSnackbarColor(item.severity ?? "info");

  return (
    <SnackbarItemPositioner style={{ transform: `translate(0, ${-position}px)` }}>
      <SnackbarItemContainer themeColor={color} phase={phase} ref={ref}>
        <SnackbarIconContainer themeColor={color}>{icon}</SnackbarIconContainer>
        <SnackbarContentsContainer>{item.message}</SnackbarContentsContainer>
        <SnackbarIconContainer style={{ pointerEvents: "all" }} themeColor={color}>
          <div style={{ width: 32, height: 32 }} onClick={props.dequeue}>
            <IoClose />
          </div>
        </SnackbarIconContainer>
      </SnackbarItemContainer>
    </SnackbarItemPositioner>
  );
});

SnackbarItemDisplay.displayName = "SnackbarItemDisplay";

interface SnackbarItemsAnimatedState {
  item: SnackbarItemState;
  phase: AnimationPhase;
}

type Timeout = ReturnType<typeof setTimeout>;

interface TimeoutState {
  itemId: number;
  timeoutId: Timeout;
  phase: AnimationPhase;
}

interface Props {
  items: SnackbarItemState[];
  dequeue: (id: number) => void;
}

const SnackbarProviderLayout: React.FC<Props> = (props) => {
  const { items } = props;
  const elements = useRef<Map<number, HTMLDivElement>>(new Map());
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const [displayedItems, setDisplayedItems] = useState<SnackbarItemsAnimatedState[]>([]);

  const [displayedItemHeights, setDisplayedItemHeights] = useState<{ id: number; height: number }[]>([]);

  const [displayedItemPos, setDisplayedItemPos] = useState<{ id: number; position: number }[]>([]);

  const [timeouts, setTimeouts] = useState<TimeoutState[]>([]);

  useEffect(() => {
    return () => {
      timeouts.forEach((t) => clearTimeout(t.timeoutId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayedItems((prevDisplayedItems) =>
      [
        ...items
          .filter((i) => prevDisplayedItems.find((p) => p.item.id === i.id) === undefined)
          .map(
            (i) =>
              ({
                item: i,
                phase: "request-creation",
              } as SnackbarItemsAnimatedState),
          ),
        ...prevDisplayedItems
          .map((i) => ({
            displayed: i,
            updated: items.find((p) => p.id === i.item.id),
          }))
          .filter(({ updated }) => updated !== undefined)
          .map(({ displayed, updated }) => ({
            ...displayed,
            item: { ...displayed.item, value: updated!.value },
          })),
        ...prevDisplayedItems
          .filter((i) => items.find((p) => p.id === i.item.id) === undefined)
          .map(
            (i) =>
              ({
                item: i.item,
                phase: "destroying",
              } as SnackbarItemsAnimatedState),
          ),
      ].sort((a, b) => a.item.id - b.item.id),
    );
  }, [items]);

  const changePhase = useCallback(
    (id: number, phase: AnimationPhase) => {
      setDisplayedItems((prevDisplayedItems) =>
        prevDisplayedItems.map((p) => ({
          ...p,
          phase: p.item.id === id ? phase : p.phase,
        })),
      );
    },
    [setDisplayedItems],
  );

  const destroy = useCallback(
    (id: number) => {
      setDisplayedItems((prevDisplayedItems) => prevDisplayedItems.filter((p) => p.item.id !== id));
    },
    [setDisplayedItems],
  );

  const removeTimeout = useCallback(
    (id: Timeout) => {
      setTimeouts((t) => t.filter((tt) => tt.timeoutId !== id));
    },
    [setTimeouts],
  );

  const removeTimeoutByItemId = useCallback(
    (id: number) => {
      setTimeouts((t) => {
        t.filter((tt) => tt.itemId === id && tt.phase !== "destroying").forEach((tt) => {
          clearTimeout(tt.timeoutId);
        });
        return t.filter((tt) => tt.itemId !== id);
      });
    },
    [setTimeouts],
  );

  const handleDequeue = useCallback(
    (id: number) => {
      removeTimeoutByItemId(id);
      props.dequeue(id);
    },
    [removeTimeoutByItemId, props],
  );

  // Make timeouts
  useEffect(() => {
    setTimeouts((prevTimeouts) => [
      ...prevTimeouts,
      ...displayedItems
        .filter(
          (i) =>
            i.phase === "request-creation" &&
            !prevTimeouts.find((p) => p.itemId === i.item.id && p.phase === "request-creation"),
        )
        .map((i) => {
          const id: ReturnType<typeof setTimeout> = setTimeout(() => {
            changePhase(i.item.id, "creating");
            removeTimeout(id);
          }, 30);
          return {
            itemId: i.item.id,
            timeoutId: id,
            phase: "request-creation" as AnimationPhase,
          };
        }),
      ...displayedItems
        .filter(
          (i) => i.phase === "creating" && !prevTimeouts.find((p) => p.itemId === i.item.id && p.phase === "creating"),
        )
        .map((i) => {
          const id: ReturnType<typeof setTimeout> = setTimeout(() => {
            changePhase(i.item.id, "created");
            removeTimeout(id);
          }, APPEAR_DURATION);
          return {
            itemId: i.item.id,
            timeoutId: id,
            phase: "creating" as AnimationPhase,
          };
        }),
      ...displayedItems
        .filter(
          (i) =>
            i.phase === "created" &&
            i.item.value.persist !== true &&
            !prevTimeouts.find((p) => p.itemId === i.item.id && p.phase === "created"),
        )
        .map((i) => {
          const id: ReturnType<typeof setTimeout> = setTimeout(() => {
            changePhase(i.item.id, "destroying");
            props.dequeue(i.item.id);
            removeTimeout(id);
          }, PERSIST_DURATION);
          return {
            itemId: i.item.id,
            timeoutId: id,
            phase: "created" as AnimationPhase,
          };
        }),
      ...displayedItems
        .filter(
          (i) =>
            i.phase === "destroying" && !prevTimeouts.find((p) => p.itemId === i.item.id && p.phase === "destroying"),
        )
        .map((i) => {
          const id: ReturnType<typeof setTimeout> = setTimeout(() => {
            destroy(i.item.id);
            removeTimeout(id);
          }, DISAPPEAR_DURATION);
          return {
            itemId: i.item.id,
            timeoutId: id,
            phase: "destroying" as AnimationPhase,
          };
        }),
    ]);
  }, [changePhase, destroy, displayedItems, props, removeTimeout]);

  // Calculate heights
  const invalidateHeights = useCallback(() => {
    setDisplayedItemHeights(
      displayedItems.map((i) => ({
        id: i.item.id,
        height: i.phase !== "destroying" ? elements.current.get(i.item.id)?.offsetHeight ?? 0 : -16,
      })),
    );
  }, [displayedItems, elements]);

  const invalidatePositions = useCallback(() => {
    setDisplayedItemPos(
      displayedItems.map((i) => ({
        id: i.item.id,
        position: displayedItemHeights.filter((d) => d.id > i.item.id).reduceRight((a, b) => a + b.height + 16, 16),
      })),
    );
  }, [displayedItemHeights, displayedItems]);

  useEffect(() => {
    invalidateHeights();
  }, [displayedItems, invalidateHeights]);

  useEffect(() => {
    invalidatePositions();
  }, [displayedItemHeights, invalidatePositions]);

  useEffect(() => {
    const listener = _.debounce(() => {
      invalidateHeights();
      invalidatePositions();
    }, 300);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [invalidateHeights, invalidatePositions]);

  const children = (
    <SnackbarContainer>
      <SnackbarWrapper>
        {displayedItems.map(({ item, phase }) => {
          const ref = (e: HTMLDivElement) => {
            elements.current.set(item.id, e);
            return elements.current.get(item.id);
          };
          return (
            <SnackbarItemDisplay
              key={item.id.toString()}
              ref={ref}
              item={item.value}
              phase={phase}
              dequeue={() => handleDequeue(item.id)}
              position={displayedItemPos.find((i) => i.id === item.id)?.position ?? 0}
            />
          );
        })}
      </SnackbarWrapper>
    </SnackbarContainer>
  );

  return mounted ? ReactDOM.createPortal(children, document.body, "snackbar") : null;
};

export default SnackbarProviderLayout;
