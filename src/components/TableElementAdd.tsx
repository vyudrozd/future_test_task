import React, {
  FC, memo, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import { ResponseData } from '../const/types';
import {
  Td, Th, TrHead, StyledProps,
} from './CustomStyledComponents';

const TrBody = styled.tr<StyledProps>`
    background-color: #f2f8fa;
    border-top: 1px solid #c6cbd1;
`;

type Props = {
    data: ResponseData[],
    setData: Function,
}

const buttonHandler = (data: ResponseData[], setData: Function, person: {id: string}, setPerson: Function) => {
  setData([{
    ...person, id: Number(person.id), description: 'sample', address: {},
  }, ...data]);
  setPerson({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
};

const checkErrors = (errors: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}) => {
  if ((errors.id !== '') || (errors.firstName !== '') || (errors.lastName !== '') || (errors.email !== '') || (errors.phone !== '')) return true; // Сделал именно так, потому что не понял как правильно итерироваться по объектам в typescript
  return false;
};

const checkFilling = (person: {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}) => {
  if ((person.id !== '') && (person.firstName !== '') && (person.lastName !== '') && (person.email !== '') && (person.phone !== '')) return true; // Сделал именно так, потому что не понял как правильно итерироваться по объектам в typescript
  return false;
};

const TableElementAdd: FC<Props> = memo(({
  data,
  setData,
  ...props
}) => {
  const [showTable, setShowTable] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [person, setPerson] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setPerson({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  }, [showTable]);

  useEffect(() => {
    const regExp = new RegExp('^[0-9]{1,3}$');
    if (person.id === '') {
      setErrors({ ...errors, id: 'Введите хотя бы одну цифру!' });
    } else if (!regExp.test(person.id)) setErrors({ ...errors, id: 'Введите не более трех цифр!' });
    else setErrors({ ...errors, id: '' });
  }, [person.id]);

  useEffect(() => {
    const regExp = new RegExp('^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$');
    if (!regExp.test(person.firstName)) setErrors({ ...errors, firstName: 'Введите корректное имя!' });
    else setErrors({ ...errors, firstName: '' });
  }, [person.firstName]);

  useEffect(() => {
    const regExp = new RegExp('^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$');
    if (!regExp.test(person.lastName)) setErrors({ ...errors, lastName: 'Введите корректную фамилию!' });
    else setErrors({ ...errors, lastName: '' });
  }, [person.lastName]);

  useEffect(() => {
    const regExp = new RegExp('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$');
    if (!regExp.test(person.email)) setErrors({ ...errors, email: 'Введите корректный Email!' });
    else setErrors({ ...errors, email: '' });
  }, [person.email]);

  useEffect(() => {
    const regExp = new RegExp('^(\\()?\\d{3}(\\))?(-|\\s)?\\d{3}(-|\\s)\\d{4}$');
    if (!regExp.test(person.phone)) setErrors({ ...errors, phone: 'Введите номер телефона в корректном формате!' });
    else setErrors({ ...errors, phone: '' });
  }, [person.phone]);

  return (
    <div {...props}>
      {showTable ? (
        <div>
          <table>
            <thead>
              <TrHead>
                <Th>
                  ID
                </Th>
                <Th>
                  Имя
                </Th>
                <Th>
                  Фамилия
                </Th>
                <Th>
                  Email
                </Th>
                <Th>
                  Телефон
                </Th>
              </TrHead>
            </thead>
            <tbody>
              <TrBody>
                <Td>
                  <div className="td_class">
                    <input
                      value={person.id}
                      onChange={({ target: { value } }) => setPerson({
                        ...person,
                        id: value,
                      })}
                    />
                    <div className="errors_class">
                      {person.id === '' ? null : errors.id}
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="td_class">
                    <input
                      value={person.firstName}
                      onChange={({ target: { value } }) => {
                        setPerson({
                          ...person,
                          firstName: value,
                        });
                      }}
                    />
                    <div className="errors_class">
                      {person.firstName === '' ? null : errors.firstName}
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="td_class">
                    <input
                      value={person.lastName}
                      onChange={({ target: { value } }) => setPerson({
                        ...person,
                        lastName: value,
                      })}
                    />
                    <div className="errors_class">
                      {person.lastName === '' ? null : errors.lastName}
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="td_class">
                    <input
                      value={person.email}
                      onChange={({ target: { value } }) => setPerson({
                        ...person,
                        email: value,
                      })}
                    />
                    <div className="errors_class">
                      {person.email === '' ? null : errors.email}
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="td_class">
                    <input
                      value={person.phone} // (582)479-0563
                      onChange={({ target: { value } }) => setPerson({
                        ...person,
                        phone: value,
                      })}
                    />
                    <div className="errors_class">
                      {person.phone === '' ? null : errors.phone}
                    </div>
                  </div>
                </Td>
              </TrBody>
            </tbody>
          </table>
        </div>
      ) : null}
      <div>
        {showTable ? (
          <button className="add_button" type="button" disabled={(checkErrors(errors) || !checkFilling(person))} onClick={() => (buttonHandler(data, setData, person, setPerson))}>
            Добавить
          </button>
        ) : null}
        <button type="button" className="show_button" onClick={() => setShowTable(!showTable)}>
          {showTable ? 'Отменить' : 'Добавить новый элемент в таблицу'}
        </button>
      </div>
    </div>
  );
});

export default styled(TableElementAdd)`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    table{
        width: 100%;
        input{
          max-width: 150px;
        }
    }
    
    .td_class{
        display: flex;
        flex-direction: column;
        min-height: 120px;
        
        input{
            border: 2px solid #7BA7AB;
            border-radius: 5px;
            outline: none;
            background: #F9F0DA;
            padding: 5px;
          }
    }
    
    .errors_class{
        color: red;
    }
    
    .show_button{
       height: 36px;
        margin-bottom: 12px;
        cursor: pointer;
        
        font-weight: 700;
        color: white;
        text-decoration: none;
        padding: .8em 1em calc(.8em + 3px);
        border: 0;
        border-radius: 5px;
        background: #F3AE0F;
        box-shadow: 0 -3px rgb(240,140,10) inset;
        transition: 0.2s;
        
        &:hover{
            background: rgb(240,140,10);
        }
        
        &:active{
             background: rgb(230,130,10);
             box-shadow: 0 3px rgb(230,130,10) inset;
        }
        
        &:disabled{
             background: rgb(230,130,10);
             box-shadow: 0 3px rgb(230,130,10) inset;
             cursor: not-allowed;
        }
    }
    
    .add_button{
        height: 36px;
        margin-bottom: 12px;
        cursor: pointer;
        
        font-weight: 700;
        color: white;
        text-decoration: none;
        padding: .8em 1em calc(.8em + 3px);
        border: 0;
        border-radius: 5px;
        background: rgb(64,199,129);
        box-shadow: 0 -3px rgb(53,167,110) inset;
        transition: 0.2s;
        
        &:hover{
            background: rgb(53, 167, 110);
        }
        
        &:active{
             background: rgb(147,33,90);
             box-shadow: 0 3px rgb(147,33,90) inset;
        }
        
        &:disabled{
             background: grey;
             box-shadow: 0 3px grey inset;
             cursor: not-allowed;
        }
    }
`;
