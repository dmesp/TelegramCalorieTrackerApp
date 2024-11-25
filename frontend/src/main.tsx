import { StrictMode } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import Loader from './components/Loader';
import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'

const MainApp = () => {

  console.log("main rerender")
  const [isLoading, setIsLoading] = useState(true);

  const userFirstVisit = async () => {
    try {
      const uid = window.Telegram.WebApp.initDataUnsafe.user.id;
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.disableVerticalSwipes();

      const data = {
        uid: uid,
        initData: window.Telegram.WebApp.initData
      };

      if (uid) {
        const response = await fetch('http://localhost:3000/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });

        if (response.ok) {
          localStorage.setItem('userAdded', 'true');

          setTimeout(() => {
            setIsLoading(false);
          }, 1000); 
        } 
        
        else {
          console.error('Ошибка сети при добавлении пользователя');
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      }
    } 
    catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('userAdded')) {
      console.log('Init');
      userFirstVisit();
    } 
    else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);  
    }
  }, []);

  return (
    <StrictMode>
      {isLoading 
        ? <Loader /> 
        : <App />
      }
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
