import { Pressable, Text } from "react-native";
import { useNavigate } from 'react-router-native';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from "../../graphql/queries";
import { useEffect } from "react";

const UserReviewButtonViewRepository = ({ style, repositoryID }) => {
  const navigate = useNavigate();
  const [getRepository, { loading, error, data }] = useLazyQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
  });

  const handleSingleView = () => {
    getRepository({ variables: { repositoryId: repositoryID } });
  };

  useEffect(() => {
    if (data && data.repository) {
      navigate('/singleView', { state: { item: data.repository } });
    }
  }, [data, navigate]);

  return (
    <Pressable onPress={handleSingleView}>
      <Text style={style}>
        View repository
      </Text>
    </Pressable>
  );
};

export default UserReviewButtonViewRepository;
