import React, { useRef } from 'react';

import Carousel from '../Carousel/Carousel';

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

/**
  document.onkeydown = (e) => {
    e = e || window.event;

    if (e.keyCode == '37') {
       swimlane.current.goBack()
    }
    else if (e.keyCode == '39') {
       swimlane.current.goForward()
    }
  }
 */

const App = () => {
  const swimlane = useRef(null);

  return (
    <Carousel
      ref={swimlane}
      arrows
      paging
      itemsDisplayed={3}
      items={
      items.map((e) => <div>{e}</div>)
    }
    />
  );
};

export default App;
