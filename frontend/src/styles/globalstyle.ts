import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* В дополнение к transparent */
    touch-action: manipulation;
   }

  body {
    color: ${({ theme }) => theme.appTextColor};
	height: 100vh;
    margin: 0px;
    padding: 0px;
    border: 0px;
    outline: 0px;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none;    /* Firefox */
    -ms-user-select: none;     /* Internet Explorer/Edge */
    font-style: normal;
    font-size: 18px;
  }

   h1 {
       font-weight: 400;    
   }



   .bigger-text {
       font-size: larger;
   }

   .smaller-text {
       font-size: small;
   }

   button {
       all: unset; 
       display: inline-block; 
       cursor: pointer; 
   }

   .calendar-numbers {
       font-size: 1.2rem;
   }    
`; 