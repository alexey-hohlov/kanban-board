import { useState } from 'react';

const useLocalStorage = (key: string, defaultValue: any = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setValue = (value: any) => {
    if (value === '' || value === null) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
