import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../styles/globalstyle';
import { themes, ThemeNames } from '../styles/themes';
import MainComponent from "./AppMainComponent/MainPage"
import Header from './AppHeaderComponents/Header';
import Footer from "./AppFooterComponents/Footer"

const AppContainer = styled.div`
  transition: ${({ theme }) => theme.colorChangeAnimation};
  height: fit-content;
`;

const App = () => {
  const [theme, setTheme] = useState(themes[ThemeNames.USER]); 

  useEffect(() => {
    const getUserTgTheme = window.Telegram.WebApp.colorScheme; 
      if (getUserTgTheme === "light") {
          setTheme(themes[ThemeNames.USER]);
      } else if (getUserTgTheme === "dark") {
          setTheme(themes[ThemeNames.USER]);
      } else {
          setTheme(themes[ThemeNames.USER]);
      }
  }, []);

  const themeToggler = (selectedTheme: ThemeNames) => {
      setTheme(themes[selectedTheme]);
  };

return (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AppContainer>
      <Router>
        <Header themeToggler={themeToggler} />
        <Routes>
          <Route path="/" element={<MainComponent />} />
        </Routes>
      </Router>
      <Footer />
    </AppContainer>
  </ThemeProvider>
  );
}

export default App;