import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/globalstyle';
import { themes, ThemeNames } from '../styles/themes'

const StyledFooter = styled.div`
  background-color: ${({ theme }) => theme.mainColor};
  transition: ${({ theme }) => theme.mainColorChange};
  color: ${({ theme }) => theme.textColor};
  height: 50px;
  width: 100%;
`;

const Footer = () => {
  return (
    <StyledFooter>

    </StyledFooter>
  );
}
export default Footer;