import React, {
  useRef, useState, useCallback, useImperativeHandle,
} from 'react';
import { nanoid } from 'nanoid';

import DefaultPagination from '../Pagination/Pagination';

import styles from './carousel.scss';

function calcSwimlaneWidth(width: number, length: number): number {
  return width * length;
}

function getItemWidth(itemsDisplayed: number): number {
  const { innerWidth } = window;

  return innerWidth / itemsDisplayed;
}

type CarouselProps = {
  items: any[],
  itemsDisplayed: number,
  arrows?: boolean,
  paging?: boolean,
  transitionTime?: number,
  easing?: string,
};

const Carousel = React.forwardRef(({
  items,
  itemsDisplayed = 3,
  arrows = false,
  paging = false,
  transitionTime = 200,
  easing = 'linear',
}: CarouselProps, ref) => {
  const [axis, setAxis] = useState(0);
  const [isAnimating, setAnimation] = useState(false);
  const swimlaneRef = useRef(null);

  const itemWidth = getItemWidth(itemsDisplayed);
  const swimlaneWidth = calcSwimlaneWidth(itemWidth, items.length);

  const getMaxAxis = useCallback(() => -(swimlaneWidth - (itemWidth * itemsDisplayed)),
    [itemWidth, swimlaneWidth, itemsDisplayed]);

  const goBack = useCallback(() => {
    if (!isAnimating && axis < 0) {
      setAnimation(true);
      setAxis(axis + itemWidth);
    }
  }, [axis, itemWidth, isAnimating]);

  const goForward = useCallback(() => {
    if (!isAnimating && axis > getMaxAxis()) {
      setAnimation(true);
      setAxis(axis - itemWidth);
    }
  }, [axis, itemWidth, isAnimating, getMaxAxis]);


  const onTransitionEnd = useCallback(() => {
    setAnimation(false);
  }, []);

  useImperativeHandle(ref, () => ({
    goBack,
    goForward,
  }));

  const mappedItems = items.map((item) => {
    const [key] = useState(nanoid);

    return (
      <li
        key={key}
        className={styles.item}
        style={{
          width: itemWidth,
        }}
      >
        {item}
      </li>
    );
  });

  return (
    <div ref={swimlaneRef} className={styles.wrapper}>
      <div className={styles.swimlane}>
        <ul
          onTransitionEnd={onTransitionEnd}
          style={{
            width: swimlaneWidth,
            transition: `transform ${transitionTime}ms ${easing}`,
            transform: `translate3d(${axis}px, 0, 0)`,
          }}
        >
          {mappedItems}
        </ul>
      </div>
      {paging && (
        <DefaultPagination
          totalItems={items.length}
          itemsDisplayed={itemsDisplayed}
        />
      )}
      {arrows && (
        <div className={styles.buttonWrapper}>
          <button type="button" onClick={goBack}>{'<'}</button>
          <button type="button" onClick={goForward}>{'>'}</button>
        </div>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
