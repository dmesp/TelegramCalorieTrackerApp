import styled from 'styled-components';

export const IconStateButton = styled.button<{ isOpen: boolean }>`
  color: ${({ isOpen, theme }) => (isOpen ? 'lightgreen' : theme.buttonColor)}; 
  transition: ${({ theme }) => theme.mainColorChange};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;

export const IconHoverButton = styled.button`
  color: ${({ theme }) => theme.buttonColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;

  &:active {
    color: lightgreen;
  }
`;