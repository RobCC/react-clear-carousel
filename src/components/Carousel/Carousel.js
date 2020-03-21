import React, {
  useRef, useState, useCallback, useImperativeHandle,
} from 'react';
import key from 'weak-key';
import PropTypes from 'prop-types';

import styles from './carousel.scss';

function calcSwimlaneWidth(width, length) {
  return width * length;
}

function getItemWidth(itemsDisplayed) {
  const { innerWidth } = window;

  return innerWidth / itemsDisplayed;
}

const Carousel = React.forwardRef(({
  itemsDisplayed,
  items = [],
  arrows = false,
  paging = false,
}, ref) => {
  const [axis, setAxis] = useState(0);
  const [isAnimating, setAnimation] = useState(false);
  const swimlaneRef = useRef(null);

  const itemWidth = getItemWidth(itemsDisplayed);
  const swimlaneWidth = calcSwimlaneWidth(itemWidth, items.length);

  const getMaxAxis = useCallback(
    () => -(swimlaneWidth - (itemWidth * itemsDisplayed)), [itemsDisplayed],
  );

  const goBack = useCallback(() => {
    if (!isAnimating && axis < 0) {
      setAnimation(true);
      setAxis(axis + itemWidth);
    }
  }, [axis, isAnimating]);


  const goForward = useCallback(() => {
    if (!isAnimating && axis > getMaxAxis()) {
      setAnimation(true);
      setAxis(axis - itemWidth);
    }
  }, [axis, isAnimating]);


  const onTransitionEnd = useCallback(() => {
    setAnimation(false);
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
            transform: `translate3d(${axis}px, 0, 0)`,
          }}
        >
          {items.map((item) => (
            <li
              key={key(item)}
              className={styles.item}
              style={{
                width: itemWidth,
              }}
            >{item}
            </li>
          ))}
        </ul>
      </div>
      {paging && items.reduce((pages, _, i) => [
        ...pages,
        <div className={styles.page}>{i + 1}</div>,
      ], [])}
      {arrows && (
        <div className={styles.buttonWrapper}>
          <button type="button" onClick={goBack}>{'<'}</button>
          <button type="button" onClick={goForward}>{'>'}</button>
        </div>
      )}
    </div>
  );
});

Carousel.propTypes = {
  arrows: PropTypes.bool,
  paging: PropTypes.bool,
  itemsDisplayed: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.node),
};

export default Carousel;
