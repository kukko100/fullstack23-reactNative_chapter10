import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext, useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey"
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const getToken = async() => {
  const authStorage = useContext(AuthStorageContext);
  const token = await authStorage.getAccessToken();
  return token;
}


const RepositoryList = () => {
  const [token, setToken] = useState('');
  getToken().then((token) => {
    setToken(token)
  });
  const {data, error, loading} = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network'});


  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={styles}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />} // Render RepositoryItem
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;