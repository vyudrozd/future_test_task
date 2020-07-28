import React, {
  FC, memo, useEffect, useState,
} from 'react';
import { FaArrowDown, FaArrowUp, FaSpinner } from 'react-icons/all';
import styled from 'styled-components';
import Pagination from './Pagination';
import { ResponseData, SortingByTypes, SortingOrder } from '../const/types';
import Search from './Search';
import Person from './Person';
import {
  TrHead, Th, Td, TrBody,
} from './CustomStyledComponents';
import TableElementAdd from './TableElementAdd';

type Props={
    data: ResponseData[],
    setInitialData: Function,
    loading: boolean,
    hasError: boolean,
};

const LoaderDiv = styled(({ ...props }) => (
  <div {...props}>
    <FaSpinner className="spinner" size="4em" />
  </div>
))`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .spinner{
    animation: rotate 1s linear infinite;
  }
  
  @keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}`;

const ErrorDiv = styled(({ error, ...props }) => (
  <div {...props}>
    <span>
      {error}
    </span>
  </div>
))<{error: string}>`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 36px;
}`;

const SortArrow = styled(({
  sortBy, currentSortBy, sortingOrder, ...props
}) => {
  if (sortBy === currentSortBy) {
    return sortingOrder === SortingOrder.INC
      ? (<FaArrowUp {...props} size="1em" />) : (<FaArrowDown {...props} size="1em" />);
  }
  return null;
})<{sortBy: SortingByTypes, currentSortBy: SortingByTypes, sortingOrder: SortingOrder}>`
  float: right;
`;

const sortData = (data: ResponseData[], sortBy:SortingByTypes, sortOrder: SortingOrder) => {
  if (sortBy === SortingByTypes.NONE) return;
  if (sortBy === SortingByTypes.ID) {
    if (sortOrder === SortingOrder.INC) data.sort((prev, next) => prev.id - next.id);
    else data.sort((prev, next) => next.id - prev.id);
  } else if (sortOrder === SortingOrder.INC) {
    data.sort((prev, next) => {
      if (prev[sortBy] < next[sortBy]) return -1;
      if (prev[sortBy] > next[sortBy]) return 1;
      return 0;
    });
  } else {
    data.sort((prev, next) => {
      if (prev[sortBy] < next[sortBy]) return 1;
      if (prev[sortBy] > next[sortBy]) return -1;
      return 0;
    });
  }
};

const handleClick = (sortOrder: SortingOrder, setSortOrder: Function, sortBy: SortingByTypes, setSortBy: Function) => {
  setSortOrder(sortOrder === SortingOrder.INC ? SortingOrder.DEC : SortingOrder.INC);
  setSortBy(sortBy);
};

const Table: FC<Props> = memo(({
  data: initialData,
  setInitialData,
  loading,
  hasError,
  ...props
}) => {
  const [dataToShow, setDataToShow] = useState(initialData.slice(0, 50));
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState(SortingByTypes.NONE);
  const [sortOrder, setSortOrder] = useState(SortingOrder.DEC);
  const [currentPage, setCurrentPage] = useState(1);
  const [person, setPerson] = useState();

  useEffect(() => {
    setSortOrder(SortingOrder.DEC);
    sortData(dataToShow, sortBy, sortOrder); // Для избежания бага с сортировкой по старому sortBy, при обратной сортировке
  }, [sortBy]);

  useEffect(() => {
    sortData(dataToShow, sortBy, sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    setSortOrder(SortingOrder.DEC);
    setSortBy(SortingByTypes.NONE);
  }, [dataToShow]);

  useEffect(() => {
    setData(initialData);
    setCurrentPage(1);
  }, [initialData]);

  useEffect(() => {
    setDataToShow(data.slice(0, 50));
  }, [data]);

  return (
    <>
      <TableElementAdd data={initialData} setData={setInitialData} />
      <Search dataToFilter={initialData} setData={setData} />
      <table {...props}>
        <thead>
          <TrHead>
            <Th onClick={() => { handleClick(sortOrder, setSortOrder, SortingByTypes.ID, setSortBy); }}>
              ID
              <SortArrow sortBy={SortingByTypes.ID} currentSortBy={sortBy} sortingOrder={sortOrder} />
            </Th>
            <Th onClick={() => { handleClick(sortOrder, setSortOrder, SortingByTypes.FIRSTNAME, setSortBy); }}>
              Имя
              <SortArrow sortBy={SortingByTypes.FIRSTNAME} currentSortBy={sortBy} sortingOrder={sortOrder} />
            </Th>
            <Th onClick={() => { handleClick(sortOrder, setSortOrder, SortingByTypes.LASTNAME, setSortBy); }}>
              Фамилия
              <SortArrow sortBy={SortingByTypes.LASTNAME} currentSortBy={sortBy} sortingOrder={sortOrder} />
            </Th>
            <Th onClick={() => { handleClick(sortOrder, setSortOrder, SortingByTypes.EMAIL, setSortBy); }}>
              Email
              <SortArrow sortBy={SortingByTypes.EMAIL} currentSortBy={sortBy} sortingOrder={sortOrder} />
            </Th>
            <Th onClick={() => { handleClick(sortOrder, setSortOrder, SortingByTypes.PHONE, setSortBy); }}>
              Телефон
              <SortArrow sortBy={SortingByTypes.PHONE} currentSortBy={sortBy} sortingOrder={sortOrder} />
            </Th>
          </TrHead>
        </thead>
        {loading
          ? null : (
            <tbody>
              {(typeof dataToShow === typeof []) && (dataToShow as ResponseData[]).map((personData) => (
                <TrBody onClick={() => setPerson(personData)} key={`table${personData.phone}`}>
                  <Td>
                    {personData.id}
                  </Td>
                  <Td>
                    {personData.firstName}
                  </Td>
                  <Td>
                    {personData.lastName}
                  </Td>
                  <Td>
                    {personData.email}
                  </Td>
                  <Td>
                    {personData.phone}
                  </Td>
                </TrBody>
              ))}
            </tbody>
          )}
      </table>
      {loading ? (<LoaderDiv />) : null}
      {hasError ? (<ErrorDiv error="При загрузке данных произошла ошибка. Повторите попытку" />) : null}
      {person ? (<Person person={person} />) : null}
      <Pagination
        data={data}
        setShowData={setDataToShow}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
});

export default styled(Table)`
  width: 100%;
`;
