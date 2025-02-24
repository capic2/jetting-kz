import OpenAI from 'openai';
import { createContext, PropsWithChildren, useContext } from 'react';

interface AppContextProps {
  openAI: OpenAI | null;
}

const AppContext = createContext<AppContextProps>({
  openAI: null,
});

export const AppContextProvider = ({
  children,
  openAI,
}: PropsWithChildren<AppContextProps>) => {
  return (
    <AppContext.Provider value={{ openAI }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  if (!AppContext) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return useContext(AppContext);
};
