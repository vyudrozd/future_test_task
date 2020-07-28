import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { AddressType, ResponseData } from '../const/types';

type Props = {
    person: ResponseData,
};

const Person : FC<Props> = memo(({
  person: {
    firstName,
    lastName,
    address: {
      streetAddress,
      city,
      state,
      zip,
    },
    description,
  },
  ...props
}) => (
  <div {...props}>
    <span className="topic_header">
      Выбран пользователь
    </span>
    {' '}
    <br />
    <b>
      {firstName}
      {' '}
      {lastName}
    </b>
    <div className="topic_header">
      Описание:
    </div>
    <div>
      <span className="description">
        {description}
      </span>
    </div>
    <div>
      <span className="topic_header">
        Адрес проживания:
      </span>
      {' '}
      <b>{streetAddress}</b>
    </div>
    <div>
      <span className="topic_header">
        Город:
      </span>
      {' '}
      <b>{city}</b>
    </div>
    <div>
      <span className="topic_header">
        Провинция/штат:
      </span>
      {' '}
      <b>{state}</b>
    </div>
    <div>
      <span className="topic_header">
        Индекс:
      </span>
      {' '}
      <b>{zip}</b>
    </div>
  </div>
));

export default styled(Person)`
    margin-top: 10px;
    
    border-radius: 5px;
    background-color: #f6f8fa;
    padding 10px;
    .topic_header{
        font-family: 'Roboto', sans-serif;
    }
`;
