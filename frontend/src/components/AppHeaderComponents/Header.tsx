import React, { useState } from 'react';
import styled, { keyframes } from "styled-components";
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import ThemeDropDown from './ThemeDropDown';
import CurrentWeekDays from './CurrentWeekDays';
import UnderHeaderComponent from './UnderHeader';
import { ThemeNames } from '../../styles/themes'; 
import { IconHoverButton } from '../../styles/common/IconButtons';

import { useNavigate } from 'react-router-dom';

const Header = styled.header`
  transition: ${({ theme }) => theme.colorChangeAnimation};

  row-gap: 15px;
  padding: 15px;

  border-bottom: solid 2px;
  border-color: ${({ theme }) => theme.accentColor50};
  border-radius: 0px  0px 15px 15px;

  display: grid;
  grid-template-columns: 100%; /* Указание ширины столбцов */
  grid-template-rows: 20px 40px ;
  grid-template-areas:
    "HeaderTop"
    "weekdays"
`;

const HeaderTop = styled.div`
  height: 100%;
  grid-area: HeaderTop;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
`;

const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-size: 12px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 20%;
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const AnimatedText = styled.h1`
  animation: ${fadeInOut} 1.5s ease-out forwards;
`;

interface HeaderProps {
  themeToggler: (selectedTheme: ThemeNames) => void; // Используйте enum для типа
}

const HeaderComponent: React.FC<HeaderProps> = ({ themeToggler }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // Стейт для временного текста

  const navigate = useNavigate();

  const handleAudioChat = () => {
    console.log("ывывфывфы")
    navigate('/audio-chat');
  };


  const getHeaderText = (day: string): string => {
    if (statusMessage) {
      return statusMessage; // Если есть сообщение (например, "очищено"), показываем его
    }

    switch (true) {
      case isToday(selectedDate):
        return "сегодня";
      case isTomorrow(selectedDate):
        return "завтра";
      case isYesterday(selectedDate):
        return "вчера";
      default:
        return day + " " + format(selectedDate, 'MMMM', { locale: ru });
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setStatusMessage("очищено");
    console.log('localStorage очищен');
    setTimeout(() => {
      setStatusMessage(null); 
    }, 2000); 
  };

  return (
    <>
      <Header>
        <HeaderTop>
          <HeaderLeft>
          <IconHoverButton onClick={clearLocalStorage} className="material-symbols-outlined">cookie</IconHoverButton>
          </HeaderLeft>
          <HeaderCenter>
            <AnimatedText key={statusMessage ? statusMessage : selectedDate.toString()}>
              {getHeaderText(format(selectedDate, "d"))}
            </AnimatedText>
          </HeaderCenter>

          <HeaderRight>
            <span className="material-symbols-outlined" onClick={handleAudioChat}>sports_esports</span>
            <ThemeDropDown themeToggler={themeToggler} /> 
          </HeaderRight>

        </HeaderTop>
        <CurrentWeekDays 
          selectedDay={selectedDate} 
          setSelectedDay={setSelectedDate} 
        />
      </Header>
      <UnderHeaderComponent 
        selectedDay={selectedDate} 
        setSelectedDay={setSelectedDate} 
 
      />   
    </>
  );
};

export default HeaderComponent;