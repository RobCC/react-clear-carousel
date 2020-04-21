import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import { PaginationProps } from '../types';
import styles from './pagination.scss';

function getPages(totalItems: number, itemsDisplayed: number): React.ReactElement[] {
  const availablePages: number = Math.ceil(totalItems / itemsDisplayed);

  return [...Array(availablePages)].map(() => {
    const [key] = useState(nanoid);

    return <li key={key} className="" />;
  });
}

const Pagination = ({ totalItems, itemsDisplayed }: PaginationProps) => {
  const pages = getPages(totalItems, itemsDisplayed);

  return (<ul className={styles.pageWrapper}>{pages}</ul>);
};

Pagination.displayName = 'Pagination';

export default Pagination;
