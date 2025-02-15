import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  IUseData,
  ITheme,
} from '../constants/types';


import {light} from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ITheme>(light);

  useEffect(() => {
    setTheme(light);
  }, []);

  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
