import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../../utils/theme";
import RepositoryListOrderPicker from "./RepositoryListOrderPicker";
import RepositorySearchBar from "./RepositorySearchBar";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.furthestBackground
  },
  container: {
    marginBottom: 100,
  }
});

const handleEndReached = (fetchMore) => {
  console.log(fetchMore)
  console.log("end reached")
}


export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    const props = this.props;

    return (
      <View>
        <RepositorySearchBar />
        <RepositoryListOrderPicker />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          style={styles}
          data={this.props.repositoryNodes}
          ItemSeparatorComponent={this.props.ItemSeparator}
          renderItem={({ item }) => <RepositoryItem item={item} fetchMore={this.props.fetchMore} />}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached(this.props.fetchMore)}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}