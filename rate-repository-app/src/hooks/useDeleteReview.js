import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useState } from "react";

const useDeleteReview = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [result, setResult] = useState(null);

  const handleDeleteReview = async (reviewID) => {
    try {
      const { data } = await deleteReview({
        variables: { deleteReviewId: reviewID },
      });

      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return { deleteReview: handleDeleteReview, result };
};

export default useDeleteReview;
