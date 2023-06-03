import { createContext, useContext } from 'react';

import { RootStore, rootStore } from './stores/RootStore';

export const StoresContext = createContext<RootStore>(rootStore);

export const useStores = () => {
  const context = useContext(StoresContext);
  if (context === undefined) {
    throw new Error('Stores error');
  }

  return context;
};


export function StoresProvider({ children }: any) {
  return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>;
}
