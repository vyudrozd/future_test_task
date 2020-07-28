import React, {
  FC, memo, useState,
} from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/all';
import { ResponseData } from '../const/types';

type Props = {
    dataToFilter: ResponseData[],
    setData: Function
}

const filterString = (searchString: string, data: ResponseData[], setData: Function) => {
  if (searchString !== '') {
    setData(data.filter((element) => element.id.toString().indexOf(searchString) !== -1
            || element.email.indexOf(searchString) !== -1
            || element.firstName.indexOf(searchString) !== -1
            || element.lastName.indexOf(searchString) !== -1
            || element.phone.indexOf(searchString) !== -1));
  } else setData(data);
};

const Search:FC<Props> = memo(({
  dataToFilter,
  setData,
  ...props
}) => {
  const [searchString, setSearchString] = useState('');

  return (
    <div {...props}>
      <div>
        <span>
          Поиск:
        </span>
      </div>
      <form className="search_bar">
        <input type="text" onChange={({ target: { value } }) => setSearchString(value)} />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="submit" onClick={() => filterString(searchString, dataToFilter, setData)}>
          <FaSearch size="1em" />
        </button>
      </form>
    </div>
  );
});

export default styled(Search)`
        * {box-sizing: border-box;}
        form {
          position: relative;
          width: 100%;
          margin: 0 auto;
        }
        input {
          width: 100%;
          height: 42px;
          padding-left: 10px;
          border: 2px solid #7BA7AB;
          border-radius: 5px;
          outline: none;
          background: #F9F0DA;
        }
        button {
          position: absolute; 
          top: 0;
          right: 0px;
          width: 42px;
          height: 42px;
          border: none;
          background: #7BA7AB;
          border-radius: 0 5px 5px 0;
          cursor: pointer;
          color: white;
        }
`;
