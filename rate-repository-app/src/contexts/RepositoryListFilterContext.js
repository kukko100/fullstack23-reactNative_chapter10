import { createContext, useContext, useState } from 'react';

const RepositoryListFilterContext = createContext();

export const RepositoryListFilterProvider = ({ children }) => {
  const [filter, setFilter] = useState('');

  const changeFilter = (filterType) => {
    setFilter(filterType);
  };

  return (
    <RepositoryListFilterContext.Provider value={{ filter, changeFilter }}>
      {children}
    </RepositoryListFilterContext.Provider>
  );
};

export const useFilter = () => {
  const filterContext = useContext(RepositoryListFilterContext);
  return filterContext;
};
