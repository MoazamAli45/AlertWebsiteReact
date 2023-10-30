import { useRef } from 'react';

export const useOnMouseDownScroll = ({
  ref,
  step = 10,
}: {
  ref: React.RefObject<HTMLElement>;
  step: number;
}) => {
  const speed = useRef(0);
  const isScrolling = useRef(false);

  const setSpeed = (state: number) => (speed.current = state);
  const setScrolling = (state: boolean) => (isScrolling.current = state);

  const onScrollLeft = () => {
    if (ref.current && isScrolling.current) {
      ref.current.scrollLeft -= step * speed.current;
      setSpeed(speed.current + 0.1);
      requestAnimationFrame(onScrollLeft);
    }
  };

  const onScrollRight = () => {
    if (ref.current && isScrolling.current) {
      ref.current.scrollLeft += step * speed.current;
      setSpeed(speed.current + 0.1);
      requestAnimationFrame(onScrollRight);
    }
  };

  return {
    onScrollLeft: () => {
      setScrolling(true);
      onScrollLeft();
    },
    onScrollRight: () => {
      setScrolling(true);
      onScrollRight();
    },
    stopScrolling: () => {
      setScrolling(false);
      setSpeed(0);
    },
  };
};
