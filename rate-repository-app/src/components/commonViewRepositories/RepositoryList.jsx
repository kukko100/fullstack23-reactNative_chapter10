import { View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORIES_FILTERED } from '../../graphql/queries';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { useContext, useState, useEffect } from 'react';
import { useOrder } from '../../contexts/RepositoryListOrderContext';
import { useFilter } from '../../contexts/RepositoryListFilterContext';
import theme from '../../utils/theme';
import { useDebounce } from 'use-debounce';
import { RepositoryListContainer } from './RepositoryListContainer';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.furthestBackground
  },
  container: {
    marginBottom: 100,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const getToken = async (authStorage) => {
  try {
    const token = await authStorage.getAccessToken();
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

const RepositoryList = () => {
  const [token, setToken] = useState('');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const { order } = useOrder();
  const { filter } = useFilter();
  const authStorage = useContext(AuthStorageContext);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken(authStorage);
        setToken(fetchedToken);
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchToken();
  }, [authStorage]);

  const [debouncedFilter] = useDebounce(filter, 500);


  const { loading, error, data, fetchMore } = useQuery(
    filter === "" ? GET_REPOSITORIES : GET_REPOSITORIES_FILTERED,
    {
      fetchPolicy: 'cache-and-network',
      variables: { searchKeyword: debouncedFilter || null },
    }
  );


  const repositoryNodes = data
    ? data.repositories.edges
      .map((edge) => edge.node)
      .sort((a, b) => {
        if (order === 'RATING_AVERAGE_DESC') {
          return b.ratingAverage - a.ratingAverage;
        } else if (order === 'RATING_AVERAGE_ASC') {
          return a.ratingAverage - b.ratingAverage;
        } else if (order === 'CREATED_AT') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      })
    : [];

  return (
    <RepositoryListContainer repositoryNodes={repositoryNodes} ItemSeparator={ItemSeparator} fetchMore={fetchMore} />
  );
};

export default RepositoryList;