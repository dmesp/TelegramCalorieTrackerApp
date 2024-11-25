import React, { useState, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import handleOutsideClick from '../handleOutsideClick';
import { ThemeNames } from '../../styles/themes';
import { IconStateButton } from '../../styles/common/IconButtons';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownList = styled.div`
  color: ${({ theme }) => theme.appTextColor};
  font-size: 20px;
  position: absolute;
  background-color: ${({ theme }) => theme.appBgColor};
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: 5px;
  max-width: fit-content;
  left: 50%;
  transform: translateX(-50%);
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

interface ThemeDropDownProps {
  themeToggler: (selectedTheme: ThemeNames) => void; // Используйте enum для типа
}

const ThemeDropDown: React.FC<ThemeDropDownProps> = ({ themeToggler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Определяем доступные темы
  const themes = useMemo(() => [
    { name: 'Light', value: ThemeNames.LIGHT },
    { name: 'Dark', value: ThemeNames.DARK },
    { name: 'User', value: ThemeNames.USER }
  ], []);

  // Обработчик выбора темы
  const handleThemeSelect = useCallback((theme: ThemeNames) => {
    themeToggler(theme);
    setIsOpen(false);
  }, [themeToggler]);

  const handleToggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  handleOutsideClick(menuRef, () => setIsOpen(false));

  return (
    <DropdownContainer ref={menuRef}>
      <IconStateButton isOpen={isOpen} onClick={handleToggleDropdown}>
        <span className="material-symbols-outlined">palette</span>
      </IconStateButton>
      {isOpen && (
        <DropdownList>
          {themes.map((theme) => (
            <DropdownItem key={theme.value} onClick={() => handleThemeSelect(theme.value)}>
              <span>{theme.name}</span>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default ThemeDropDown;