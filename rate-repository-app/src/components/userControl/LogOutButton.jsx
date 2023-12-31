import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from 'react-router-native';
import theme from '../../utils/theme';
import { useApolloClient } from '@apollo/client';
import { useContext } from "react";
import AuthStorageContext from "../../contexts/AuthStorageContext";
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  tabA: {
    flexGrow: 0,
    marginLeft: 20,
    marginTop: 20,
    color: theme.colors.appBarFont,
    fontWeight: '700',
  }
});

const LogOutButton = ({ tabName, linkName }) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const handleLogout = async () => {
    authStorage.removeAccessToken()
    client.resetStore();
    navigate("/");
  };

  return (
    <Pressable onPress={handleLogout}>
        <Text style={styles.tabA}>{tabName}</Text>
    </Pressable>
  );
};

export default LogOutButton;
