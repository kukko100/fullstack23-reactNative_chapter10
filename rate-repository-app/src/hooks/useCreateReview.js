import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    try {
      const result = await mutate({
        variables: {
          review: {
            ownerName: ownerName,
            rating: rating,
            repositoryName: repositoryName,
            text: text
          }
        }
      })
      // apolloClient.resetStore();
    } catch (error) {
      return error;
    }
  };

  return [createReview, result];
};

export default useCreateReview;