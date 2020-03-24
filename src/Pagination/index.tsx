import React from 'react';

import styles from './pagination.scss';

type PaginationProps = {
  totalItems: number,
  itemsDisplayed: number,
};

function getPages(totalItems: number, itemsDisplayed: number): JSX.Element[] {
  const availablePages: number = Math.ceil(totalItems / itemsDisplayed);

  return [...Array(availablePages)].map((_, i) => <li key={`page-${i}`} className="" />);
}

const Pagination = ({ totalItems, itemsDisplayed }: PaginationProps) => {
  const pages = getPages(totalItems, itemsDisplayed);

  return (<ul className={styles.pageWrapper}>{pages}</ul>);
};

export default Pagination;
