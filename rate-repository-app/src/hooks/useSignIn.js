import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from "react";

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    try {
      const result = await mutate({
        variables: {
          credentials: {
            password: password,
            username: username
          }
        }
      })
      authStorage.setAccessToken(result.data.authenticate.accessToken);
      apolloClient.resetStore();
    } catch (error) {
      return error;
    }
  };

  return [signIn, result];
};

export default useSignIn