import Carousel from './components/Carousel/Carousel';

// TODO: Create aliases

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
  const React = require('react');
  const ReactDOM = require('react-dom');

  /* eslint-disable no-console */
  console.log(`Currently on ${process.env.NODE_ENV}`);

  document.body.style.margin = '0';

  const items = [
    { id: 'ID_1', value: 'Item 1' },
    { id: 'ID_2', value: 'Item 2' },
    { id: 'ID_3', value: 'Item 3' },
    { id: 'ID_4', value: 'Item 4' },
    { id: 'ID_5', value: 'Item 5' },
    { id: 'ID_6', value: 'Item 6' },
    { id: 'ID_7', value: 'Item 7' },
    { id: 'ID_8', value: 'Item 8' },
    { id: 'ID_9', value: 'Item 9' },
    { id: 'ID_10', value: 'Item 10' },
  ];

  ReactDOM.render(
    <Carousel
      arrows
      paging
      itemsDisplayed={3}
      items={
        items.map((e) => <div key={e.id} style={{
          border: '5px solid red',
          padding: 10,
          margin: 10,
        }}>{e.value}</div>)
      }
    />,
    document.getElementById('root'),
  );
}


export default Carousel;
