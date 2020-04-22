import React, {
  useRef, useState, useMemo, useCallback, useImperativeHandle, useReducer,
} from 'react';

import { CarouselProps, CarouselRef } from '#/types';
import DefaultPagination from '../Pagination/Pagination';
import { getItemWidth, getSwimlaneWidth, getMaxScroll } from '#/utils';

import { reducer, initialState } from './carouselReducer';
import styles from './carousel.scss';

function generateItems(items: React.ReactElement[], itemWidth: number): React.ReactElement[] {
  return items.map((item, i) => (
    <li
      key={`item_${item?.key ?? i}`}
      className={styles.item}
      style={{
        width: itemWidth,
      }}
    >
      {item}
    </li>
  ));
}

// TODO: Add useReducer

const Carousel = React.forwardRef<CarouselRef, CarouselProps>(({
  items,
  itemsDisplayed = 3,
  arrows = false,
  paging = false,
  transitionTime = 200,
  easing = 'linear',
}: CarouselProps, ref) => {
  const [{ isTransitioning, axis }, dispatch] = useReducer(reducer, initialState);
  const swimlaneRef = useRef(null);

  const itemWidth = getItemWidth(itemsDisplayed);
  const swimlaneWidth = getSwimlaneWidth(itemWidth, items.length);
  const maxScroll = getMaxScroll(swimlaneWidth, itemWidth, itemsDisplayed);

  const mappedItems: React.ReactElement[] = useMemo(
    () => generateItems(items, itemWidth),
    [items, itemWidth],
  );

  const goBack = useCallback(() => {
    if (!isTransitioning && axis < 0) {
      dispatch({
        type: 'back',
        axis: +(axis + itemWidth).toFixed(3),
      });
    }
  }, [axis, itemWidth, isTransitioning]);

  const goForward = useCallback(() => {
    if (!isTransitioning && axis > maxScroll) {
      dispatch({
        type: 'forward',
        axis: +(axis - itemWidth).toFixed(3),
      });
    }
  }, [axis, itemWidth, isTransitioning, maxScroll]);

  const onTransitionEnd = useCallback(() => {
    dispatch({
      type: 'finished',
    });
  }, []);

  useImperativeHandle(ref, () => ({
    goBack,
    goForward,
  }));

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
