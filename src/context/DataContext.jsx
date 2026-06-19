import { createContext, useContext } from 'react';
import { useFirestoreData } from '../hooks/useFirestoreData';

const DataContext = createContext(null);

export const usePortfolioData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('usePortfolioData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }) => {
  const data = useFirestoreData();
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
