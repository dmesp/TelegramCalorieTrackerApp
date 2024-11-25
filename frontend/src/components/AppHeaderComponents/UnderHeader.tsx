import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import handleOutsideClick from '../handleOutsideClick';
import CalendarDropDown from './CalendarDropDown';

const CalendarButton = styled.div<{ isOpen: boolean }>`
  background: ${({ theme, isOpen }) => (isOpen ? theme.accentColor100 : theme.accentColor100)};
  transition: ${({ theme }) => theme.colorChangeAnimation};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 100px;
  z-index: 10;
  border: 2px solid;
  border-color: ${({ theme, isOpen }) => (isOpen ? theme.accentColor100 : "white")};
  border-radius: 20px;
  cursor: pointer;
  margin-top: -45px;
`;

const UnderHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: fit-content;
  background-color: ${({ theme }) => theme.secBgColor};
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 0 0 15px 15px;
`;

const TextContainer = styled.div`
  display: flex;
  width: 30%;
  max-width: 300px;
  flex-direction: column;
  align-items: center;
`;

const UpperText = styled.div`
  font-weight: 700;
  width: 100%;
  height: 20px;
  font-size: 1rem;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LowerText = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  font-weight: 300;
`;

const TextSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: max-content;
`;

interface CalendarActionsProps {
  selectedDay: Date;
  setSelectedDay: (day: Date) => void;
}

const UnderHeaderComponent: React.FC<CalendarActionsProps> = ({ 
  selectedDay, 
  setSelectedDay
  }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  handleOutsideClick(menuRef, () => setIsCalendarOpen(false));

  const handleToggleDropdown = useCallback(() => {
    setIsCalendarOpen(prev => !prev);
  }, []);

  return (
    <UnderHeaderContent ref={menuRef}>
      <TextContainer>
        <UpperText>
          <TextSpan>Б</TextSpan>
          <TextSpan>Ж</TextSpan>
          <TextSpan>У</TextSpan>
        </UpperText>
        <LowerText>
          <TextSpan>120</TextSpan>
          <TextSpan>80</TextSpan>
          <TextSpan>450</TextSpan>
        </LowerText>
      </TextContainer>
      <CalendarButton isOpen={isCalendarOpen} onClick={handleToggleDropdown}>
        <span className="material-symbols-outlined">menu</span>
      </CalendarButton>
      <CalendarDropDown
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}

        selectedDay={selectedDay}

        setSelectedDay={setSelectedDay}
      />
      <TextContainer>
        <UpperText>
          <TextSpan>Ккал</TextSpan>
          <TextSpan>%дн</TextSpan>
        </UpperText>
        <LowerText>
          <TextSpan>4500</TextSpan>
          <TextSpan>80</TextSpan>
        </LowerText>
      </TextContainer>
    </UnderHeaderContent>
  );
};

export default UnderHeaderComponent;
