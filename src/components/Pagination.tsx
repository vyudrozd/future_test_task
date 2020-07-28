import React, {
  FC, memo, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { ResponseData } from '../const/types';

type Props = {
    data: ResponseData[],
    setShowData: Function,
    setCurrentPage: Function,
    currentPage: number,
    className?: string
}

const Page = styled(({
  pageNum, currentPage, maxPage, data, setCurrentPage, ignoreCheck, isMaxPage, ...props
}) => {
  if ((ignoreCheck || ((pageNum > 1) && (pageNum < maxPage))) && !(isMaxPage && (maxPage === 1))) {
    return (
      <button
        type="button"
        onClick={() => {
          setCurrentPage(pageNum);
        }}
        {...props}
      >
        {pageNum}
      </button>
    );
  }
  return null;
})<{pageNum: number, currentPage: number, maxPage: number, ignoreCheck?: boolean, isMaxPage?: boolean,
    data: ResponseData[], setCurrentPage: Function}>`
    color: ${(props) => (props.pageNum === props.currentPage ? 'white' : '#6666ff')};
            ${(props) => (props.pageNum === props.currentPage ? 'background-color: #6666ff;' : '')}
            border: 1px solid #6666ff;
            text-decoration: none;
            padding: 5px;
            width: 35px;
            height: 35px;
            cursor: pointer;
            &:hover{
                color: white;
                background-color: #6666ff;
            }
            &:focus{
                border: 0;
            }
`;

const PageSkipper = styled(({
  currentPage, maxPage, left, right, ...props
}) => {
  if ((left && (currentPage > 4)) || (right && (currentPage < maxPage - 3))) {
    return (
      <button
        type="button"
        {...props}
      >
        ...
      </button>
    );
  }
  return null;
})<{currentPage: number, maxPage: number, left?: boolean, right?: boolean}>`
            border: 1px solid #6666ff;
            text-decoration: none;
            padding: 0;
            width: 35px;
            height: 35px;
            padding: 5px;
            cursor: default;
            &:hover{
                color: white;
                background-color: #6666ff;
            }
`;

const Pagination: FC<Props> = memo(({
  data,
  setShowData,
  setCurrentPage,
  currentPage,
  className,
}) => {
  const [maxPage, setMaxPage] = useState(Math.ceil(data.length / 50));

  useEffect(() => {
    setMaxPage(Math.ceil(data.length / 50));
  }, [data]);

  useEffect(() => {
    setShowData(data.slice((currentPage - 1) * 50, currentPage * 50));
  }, [currentPage, data, setShowData]);

  return data.length ? (
    <div className={className}>
      <div>
        <Page pageNum={1} currentPage={currentPage} maxPage={maxPage} data={data} setCurrentPage={setCurrentPage} ignoreCheck />
        <PageSkipper left currentPage={currentPage} maxPage={maxPage} />
        <Page pageNum={currentPage - 2} currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} data={data} />
        <Page pageNum={currentPage - 1} currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} data={data} />
        <Page pageNum={currentPage} currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} data={data} />
        <Page pageNum={currentPage + 1} currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} data={data} />
        <Page pageNum={currentPage + 2} currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} data={data} />
        <PageSkipper right currentPage={currentPage} maxPage={maxPage} />
        <Page pageNum={maxPage} currentPage={currentPage} maxPage={maxPage} data={data} setCurrentPage={setCurrentPage} isMaxPage ignoreCheck />
      </div>
    </div>
  ) : null;
});

export default styled(Pagination)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100px;
    flex-wrap: wrap;
    
    button{
        font-family: 'Roboto', sans-serif;
    }
`;
