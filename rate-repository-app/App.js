import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { RepositoryListOrderProvider } from './src/contexts/RepositoryListOrderContext';
import { RepositoryListFilterProvider } from './src/contexts/RepositoryListFilterContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

if (__DEV__) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const App = () => {

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <RepositoryListOrderProvider>
              <RepositoryListFilterProvider>
                <Main />
              </RepositoryListFilterProvider>
            </RepositoryListOrderProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
}

export default App;
