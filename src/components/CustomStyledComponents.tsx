import React from 'react';
import styled from 'styled-components';

export interface StyledProps{
    className?: string,
    children?: React.ReactNode[] | string | number,
    key?: string,
    onClick?: () => any
}

export const TrHead = styled.tr<StyledProps>`
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
`;

export const TrBody = styled.tr<StyledProps>`
    cursor: pointer;
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
    &:nth-child(2n){
        background-color: #f6f8fa;
    }
    
    &:hover{
        background-color: #f2f8fa;
    }
`;

export const Td = styled(({ children, ...props }) => (
  <td {...props}>
    {children}
  </td>
))<StyledProps>`
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
`;

export const Th = styled.th<StyledProps>`
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
    cursor: pointer;
    align-items: center;
    
    font-family: 'Roboto', sans-serif;
`;
