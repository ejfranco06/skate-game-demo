import React, { createContext, useState } from 'react';

const AppContext = createContext({});

export const useApp = () => React.useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [currentOpponent, setCurrentOpponent] = useState(null);

  return (
    <AppContext.Provider
      value={{
        currentOpponent,
        setCurrentOpponent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
