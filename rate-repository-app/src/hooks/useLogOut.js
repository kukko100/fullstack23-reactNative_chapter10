import { useApolloClient } from "@apollo/client";

import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from "react";

const useLogOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  authStorage.setAccessToken(result.data.authenticate.accessToken);
  apolloClient.resetStore();
};

export default useLogOut;