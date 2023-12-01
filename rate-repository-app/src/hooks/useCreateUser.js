import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({ password, username }) => {
    try {
      const result = await mutate({
        variables: {
          user: {
            password: password,
            username: username
          }
        }
      })
      return result;
    } catch (error) {
      return error;
    }
  };

  return [createUser, result];
};

export default useCreateUser;