import React, { useState } from 'react';
import styled from 'styled-components';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isAfter, isBefore, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';

const CalendarDropDownContainer = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.appBgColor};
  color: ${({ theme }) => theme.appTextColor};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateX(-50%) translateY(${({ isOpen }) => (isOpen ? '0' : '-20px')});
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  position: absolute;
  display: grid;
  grid-template-columns: 35px 1fr 35px;
  grid-template-rows: min-content 1fr;
  grid-template-areas:
    "CalendarToLeft CalendarHeader CalendarToRight"
    "CalendarToLeft CalendarDays CalendarToRight";
  top: 125px;
  left: 50%;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);
`;

const CalendarHeader = styled.div`
  font-size: 10px;
  grid-area: CalendarHeader;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftSwipeButton = styled.button`
  grid-area: CalendarToLeft;
  border: none;
  color: ${({ theme }) => theme.appTextColor};
  cursor: pointer;

  &:active {
    background-color: #f0f0f0;
  }
`;

const RightSwipeButton = styled.button`
  grid-area: CalendarToRight;
  border: none;
  color: ${({ theme }) => theme.appTextColor};
  cursor: pointer;

  &:active {
    background-color: #f0f0f0;
  }
`;

const CalendarDays = styled.div`
  grid-area: CalendarDays;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
  width: fit-content;
  padding-bottom: 15px;
`;

const Day = styled.div<{ isSelected: boolean }>`
  border: 2px solid;
  background: ${({ theme, isSelected }) => (isSelected ? theme.accentColor100 : "")};
  border-color: ${({ theme, isSelected }) => (isSelected ? theme.accentColor100 : theme.accentColor20)};
  transition: ${({ theme }) => theme.colorChangeAnimation};
  padding: 10px;
  text-align: center;
  border-radius: 10px;
`;

interface CalendarDropDownProps {
    isCalendarOpen: boolean;
    setIsCalendarOpen: (state: boolean) => void;
    selectedDay: Date;
		setSelectedDay: (day: Date) => void;
  }

const CalendarDropDown: React.FC<CalendarDropDownProps> = ({
	isCalendarOpen,
	setIsCalendarOpen,
	selectedDay,
	setSelectedDay}) => {

	const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

	const today = new Date();
	const isBefore15th = today.getDate() < 15;

	const nextMonth = addMonths(selectedMonth, 1);
	const previousMonth = subMonths(selectedMonth, 1);
	
	// Обработка перелистывания на следующий месяц
	const handleNextMonth = () => {
		if (!isBefore15th || isAfter(nextMonth, startOfMonth(today))) {
			setSelectedMonth(nextMonth); // Меняем только месяц, день не меняется
		}
	};

	const handlePreviousMonth = () => {
		setSelectedMonth(previousMonth); 
	};

	const daysInMonth = eachDayOfInterval({
		start: startOfMonth(selectedMonth),
		end: endOfMonth(selectedMonth)
	});

	const handleDayClick = (day: Date) => {
		if (!isSameDay(day, selectedDay)) {
			setIsCalendarOpen(false);
			setSelectedDay(day); 
		}
	};

	return (
		<CalendarDropDownContainer isOpen={isCalendarOpen}>
			<LeftSwipeButton 
				onClick={handlePreviousMonth} 
				disabled={!isAfter(selectedMonth, new Date(2024, 11, 1))}>
				{"<"}
			</LeftSwipeButton>
			<CalendarHeader>
				<h1>
					{format(selectedMonth, 'LLLL yyyy', { locale: ru })}
				</h1>
			</CalendarHeader>
			<RightSwipeButton 
				onClick={handleNextMonth} 
				disabled={isBefore15th && isBefore(addMonths(selectedMonth, 1), startOfMonth(new Date()))}>
				{">"}
			</RightSwipeButton>
			<CalendarDays className="calendar-numbers">
				{daysInMonth.map((day, index) => (
					<Day 
						key={index} 
						isSelected={isSameDay(day, selectedDay)} 
						onClick={() => handleDayClick(day)}
					>
						{format(day, 'd')}
					</Day>
				))}
			</CalendarDays>
		</CalendarDropDownContainer>
	);
};

export default CalendarDropDown;