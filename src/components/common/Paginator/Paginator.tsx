import React, { useState } from "react";
import styles from './paginator.module.css';
import cn from 'classnames';

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

let Paginator: React.FC<PropsType> = ({ 
  totalItemsCount, 
  pageSize, 
  currentPage, 
  onPageChanged, 
  portionSize = 10 
}) => {

  let pageCount = Math.ceil(totalItemsCount / pageSize); // всего страниц

  let pages: Array<number> = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pageCount / portionSize); // 1-10
  let [portionNumber, setPortionNumber] = useState<number>(1);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // 1 
  let rightPortionPageNumber = portionNumber * portionSize; // 10

  return (
    <div className={styles.paginator}>
      {(portionNumber > 1) &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
      {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span className={cn({
              [styles.selectedPage]: currentPage === p
            }, styles.pageNumber)}
              onClick={(e) => { onPageChanged(p) }}
              key={p}>
              {p}</span>)
        })}
      {(portionCount > portionNumber) &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>
  );
};

export default Paginator;
