import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';

const WeekDaysContainer = styled.div`
    grid-area: weekdays;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 7px;
`;

const DayDiv = styled.div<{ isSelected: boolean }>`
    grid-area: weekdays;
    width: 40px;
    height: 40px;
    border: 2px solid;
    border-color: ${({ theme, isSelected }) => (isSelected ? theme.accentColor70 : theme.accentColor20)};
    transition: ${({ theme }) => theme.colorChangeAnimation};
    box-shadow: 0px 0px 5px ${({ theme }) => theme.accentColor100};

    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type CurrentWeekDaysProps = {
  selectedDay: Date;
  setSelectedDay: (day: Date) => void;
};

const CurrentWeekDays: React.FC<CurrentWeekDaysProps> = ({ selectedDay, setSelectedDay }) => {
  const today = new Date();
  const [days, setDays] = useState<Date[]>([]); 

  useEffect(() => {
    const tempDays: Date[] = [];
    for (let i = -3; i <= 3; i++) {
      const day = addDays(today, i);
      tempDays.push(day); 
    }
    setDays(tempDays);
  }, []);

  return (
    <WeekDaysContainer className="calendar-numbers">
      {days.map((day, index) => (
        <DayDiv
          key={index}
          isSelected={selectedDay.getDate() === day.getDate() && selectedDay.getMonth() === day.getMonth() && selectedDay.getFullYear() === day.getFullYear()} // Сравниваем объекты Date
          onClick={() => setSelectedDay(day)}>
          <p>{format(day, 'd')}</p>
        </DayDiv>
      ))}
    </WeekDaysContainer>
  );
};
  
export default CurrentWeekDays;