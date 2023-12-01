import { Pressable, Text, Alert } from "react-native";
import { useNavigate } from 'react-router-native';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from "../../graphql/queries";
import { useEffect } from "react";
import useDeleteReview from "../../hooks/useDeleteReview";
import { DELETE_REVIEW } from "../../graphql/mutations";

const UserReviewButtonDeleteReview = ({ style, repositoryID, refetch }) => {
  const navigate = useNavigate();
  const [getRepository, { loading, error, data }] = useLazyQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
  });

  const { deleteReview, result } = useDeleteReview();

  const deleteAlert = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log("cancel pressed")
        },
        {
          text: 'Delete',
          onPress:() => handleDelete()
        }

      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const handleDelete = async () => {
    try {
      await deleteReview(repositoryID);
    } catch (error) {
      console.log("Error in delete review button: ", error);
    }
  };

  useEffect(() => {
    if (result && result.deleteReview) {
      console.log('Review deleted successfully');
      refetch();
    } else if (result && result.error) {
      console.error('Failed to delete review:', result.error);
    }
  }, [result, navigate]);

  return (
    <Pressable onPress={deleteAlert}>
      <Text style={style}>
        Delete review
      </Text>
    </Pressable>
  );
};

export default UserReviewButtonDeleteReview;