import { View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useLocation } from "react-router-native";

const SingleRepositoryView = () => {
  const location = useLocation();
  const item = location.state.item;

  return (
    <View>
      <RepositoryItem item={item} showGitHubButton={true} />
    </View>
  )
}

export default SingleRepositoryView;