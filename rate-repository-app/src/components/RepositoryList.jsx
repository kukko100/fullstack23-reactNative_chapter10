import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories'
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey"
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
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