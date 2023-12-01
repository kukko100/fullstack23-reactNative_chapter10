import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER_REVIEWS } from "../../graphql/queries";
import UserReviewItem from "./UserReviewItem";
import theme from "../../utils/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 100
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.furthestBackground
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UsersReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER_REVIEWS);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const userReviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <View style={styles.container}>
      <FlatList
        data={userReviews}
        renderItem={({ item: review }) => <UserReviewItem review={review} refetch={refetch} />}
        keyExtractor={(review) => review.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default UsersReviews;
