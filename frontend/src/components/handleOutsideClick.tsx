import { useEffect, useCallback } from 'react';

const handleOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, что ref.current существует и является элементом
      if (ref.current && !ref.current.contains(event.target as Node)) {
        memoizedCallback();
      }
    };
    // Добавляем обработчик
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Удаляем обработчик
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, memoizedCallback]);
};

export default handleOutsideClick;