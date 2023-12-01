import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { useFilter } from '../../contexts/RepositoryListFilterContext';
import theme from '../../utils/theme';

const RepositorySearchBar = () => {
  const { filter, changeFilter } = useFilter();

  const styles = StyleSheet.create({
    searchBarContainer: {
      padding: 10,
      backgroundColor: theme.colors.furthestBackground,
    },
    searchBar: {
      backgroundColor: 'white'
    }
  });

  const searchBarTheme = useTheme();

  const handleSearch = (query) => {
    changeFilter(query);
  };

  return (
    <View style={styles.searchBarContainer}>
      <Searchbar
        placeholder="Search repositories"
        onChangeText={handleSearch}
        value={filter}
        style={styles.searchBar}
        theme={{
          ...searchBarTheme,
          roundness: 0,
        }}
      />
      <Text></Text>
    </View>
  )
}

export default RepositorySearchBar;