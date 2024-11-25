import React, { useState } from "react";
import styled from 'styled-components';

const Main = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  margin-top: 40px;
  gap: 30px;
  flex-direction: column;
  align-items: center;
`;

const CalorieCounter = styled.div`
  background-color: ${({ theme }) => theme.secBgColor};
  transition: ${({ theme }) => theme.colorChangeAnimation};
  box-shadow: 0px 0px 8px ${({ theme }) => theme.secBgColor};
  height: fit-content;
  max-width: 500px;
  width: 88%;
  text-align: center;
  border-radius: 20px 20px 20px 20px;

  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: min-content min-content 25px;
  grid-template-areas:
    "main main"
    "main main"
    "footer rfooter";

  &:active {
    box-shadow: 0px 0px 8px ${({ theme }) => theme.accentColor70};
  }
`;

const CalorieMain = styled.div`
  grid-area: main;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "daytime cal"
    "daytime bju";
`;

const DayTime = styled.div`
  grid-area: daytime;
  font-size: 25px;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const Calories = styled.div`
  grid-area: cal;
  font-size: 22px;
  padding-top: 5px;
  gap: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nutritions = styled.div`
  grid-area: bju;
  padding-top: 5px;
  padding-bottom: 5px;
  gap: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CounterFooter = styled.div<CounterFooterProps>`
  z-index: 10;
  grid-area: footer;
  background-color: ${({ theme, isHeld }) =>
    isHeld ? theme.accentColor70 : theme.accentColor20};
  border-radius: 0px 20px 20px 20px;

  &:active {
    background-color: ${({ theme }) => theme.accentColor50};
  }
`;

const RCounterFooter = styled.div`
  grid-area: rfooter;

  border-radius: 0px 20px 20px 20px;

  &:active {
    background-color: ${({ theme }) => theme.accentColor50};
  }
`;

const TextSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;


interface CounterFooterProps {
  isHeld: boolean;
}

const data = [
  {
    headerSideLeft: ['60', '20', '200'],
    headerCenter: 'Завтрак',
    headerSideRight: ['2500', '50%'],
  },
  {
    headerSideLeft: ['40', '10', '50'],
    headerCenter: 'Обед',
    headerSideRight: ['1200', '15%'],
  },
  {
    headerSideLeft: ['10', '40', '100'],
    headerCenter: 'Ужин',
    headerSideRight: ['1250', '10%'],
  },
  {
    headerSideLeft: ['10', '5', '70'],
    headerCenter: 'Перекус',
    headerSideRight: ['300', '7%'],
  },
];

const MainComponent = () => {
  const [heldIndex, setHeldIndex] = React.useState<number | null>(null);

  const handleMouseDown = (index: number) => setHeldIndex(index);
  const handleMouseUp = () => setHeldIndex(null);

  return (
    <Main>
      {data.map((item, index) => (
        <CalorieCounter
          key={index}
          //onMouseDown={() => handleMouseDown(index)} // Для ПК
          //onMouseUp={handleMouseUp}
          //onTouchStart={() => handleMouseDown(index)} // Для мобильных устройств
          //onTouchEnd={handleMouseUp}
        >
        <CalorieMain>
          <DayTime>
            {item.headerCenter}
          </DayTime>
          <Calories>
              {item.headerSideRight.map((text, idx) => (
                <TextSpan key={idx}>{text}</TextSpan>
              ))}
          </Calories>
          <Nutritions>
              {item.headerSideLeft.map((text, idx) => (
                <TextSpan key={idx}>{text}</TextSpan>
              ))}
          </Nutritions>
        </CalorieMain>
        <CounterFooter isHeld={heldIndex === index}>

        </CounterFooter>
        <RCounterFooter></RCounterFooter>

        </CalorieCounter>
      ))}
    </Main>
  );
};
export default MainComponent;