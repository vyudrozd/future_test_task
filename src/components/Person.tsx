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
}) => (
  <div>
    Выбран пользователь
    {' '}
    <br />
    <b>
      {firstName}
      {' '}
      {lastName}
    </b>
    <div>
      Описание:
      <span>
        {description}
      </span>
    </div>
    <div>
      Адрес проживания:
      {' '}
      <b>{streetAddress}</b>
    </div>
    <div>
      Город:
      {' '}
      <b>{city}</b>
    </div>
    <div>
      Провинция/штат:
      {' '}
      <b>{state}</b>
    </div>
    <div>
      Индекс:
      {' '}
      <b>{zip}</b>
    </div>
  </div>
));

export default styled(Person)`

`;
