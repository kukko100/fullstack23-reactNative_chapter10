import { View, Text, StyleSheet, FlatList, Pressable, Image, Linking } from "react-native"
import theme from "../../utils/theme";
import { useLocation } from 'react-router-native';
import format from 'date-fns/format';
import UserReviewButtonDeleteReview from "./UserReviewButtonDeleteReview";
import UserReviewButtonViewRepository from "./UserReviewButtonViewRepository";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  reviewContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-around',
    marginHorizontal: 10
  },
  buttonView: {
    backgroundColor: theme.colors.itemLanguageButton,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    paddingVertical: 15,
    padding: 45,
    textAlign: 'center',
    fontWeight: '500'
  },
  buttonDelete: {
    backgroundColor: theme.colors.redButton,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    paddingVertical: 15,
    padding: 45,
    textAlign: 'center',
    fontWeight: '500' 
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: theme.colors.itemLanguageButton,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewDetailsContainer: {
    flex: 1, // Take remaining space
  },
  ratingText: {
    fontWeight: 'bold',
    color: theme.colors.itemLanguageButton,
  },
  createdAt: {
    color: '#586069',
  },
  separator: {
    height: 2,
    backgroundColor: "lightgrey"
  },
});

const UserReviewItem = ({ review, refetch }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewDetailsContainer}>
          <Text style={styles.username}>{review.repository.ownerName}/{review.repository.name}</Text>
          <Text style={styles.createdAt}>{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
        
      </View>
      <View style={styles.buttonContainer}>
        <UserReviewButtonViewRepository style={styles.buttonView} repositoryID={review.repository.id} />
        <UserReviewButtonDeleteReview style={styles.buttonDelete} repositoryID={review.id} refetch={refetch} />
      </View>
    </View>
      
  );
};

export default UserReviewItem