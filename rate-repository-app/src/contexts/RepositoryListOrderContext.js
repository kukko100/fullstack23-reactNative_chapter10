import { createContext, useContext, useState } from 'react';

const RepositoryListOrderContext = createContext();

export const RepositoryListOrderProvider = ({ children }) => {
  const [order, setOrder] = useState('CREATED_AT');

  const changeOrder = (orderType) => {
    setOrder(orderType);
  };

  return (
    <RepositoryListOrderContext.Provider value={{ order, changeOrder }}>
      {children}
    </RepositoryListOrderContext.Provider>
  );
};

export const useOrder = () => {
  const orderContext = useContext(RepositoryListOrderContext);
  return orderContext;
};
