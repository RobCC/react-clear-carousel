import React from 'react';
import ReactDOM from 'react-dom';

import Carousel from  './Carousel';

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

ReactDOM.render(
  <Carousel arrows
    paging
    itemsDisplayed={3}
    items={
      items.map((e) => <div>{e}</div>)
  }/>,
  document.getElementById('root')
);
