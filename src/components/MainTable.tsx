import React, { FC, memo, useState } from 'react';
import styled from 'styled-components';
import Table from './Table';

type Props = {
    loadSmallData: Function,
    loadBigData: Function,
}

const MainTable: FC<Props> = memo(({
  loadSmallData,
  loadBigData,
  ...props
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div {...props}>
      <div className="fixed_wrap">
        <button className="loader_button" type="button" disabled={loading} onClick={() => loadSmallData(setData, setLoading, setHasError)}>Загрузить малый объем данных</button>
        <button className="loader_button right_button" type="button" disabled={loading} onClick={() => loadBigData(setData, setLoading, setHasError)}>Загрузить большой объем данных</button>
        <Table data={data} hasError={hasError} setInitialData={setData} loading={loading} />
      </div>
    </div>
  );
});

export default styled(MainTable)`
    display: flex;
    width: 100%;
    justify-content: center;
    .fixed_wrap{
        width: 960px;
        justify-content: center;
    }
    
    .loader_button{
        width: 45%;
        height: 36px;
        margin-bottom: 12px;
        cursor: pointer;
        
        font-weight: 700;
        color: white;
        text-decoration: none;
        padding: .8em 1em calc(.8em + 3px);
        border: 0;
        border-radius: 5px;
        background: rgb(123, 167, 171);
        box-shadow: 0 -3px rgb(112,150,155) inset;
        transition: 0.2s;
        
        &:hover{
            background: rgb(112,150,155);
        }
        
        &:active{
             background: rgb(105,135,140);
             box-shadow: 0 3px rgb(105,135,140) inset;
        }
        
        &:disabled{
             background: rgb(105,135,140);
             box-shadow: 0 3px rgb(105,135,140) inset;
             cursor: not-allowed;
        }
    }
    
    .right_button{
        float: right;
    }
`;
