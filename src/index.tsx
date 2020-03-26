import Carousel from  './Carousel';

if (process.env.NODE_ENV !== 'production') {
  const React = require('react');
  const ReactDOM = require("react-dom");

  console.log(`Currently on ${process.env.NODE_ENV}`);

  document.body.style.margin = '0';

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
}


export default Carousel
