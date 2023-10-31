const { Pressable, StyleSheet, Text } = require("react-native")
import { Link } from 'react-router-native';
import theme from '../utils/theme';

const styles = StyleSheet.create({
  tabA: {
    flexGrow: 0,
    marginLeft: 20,
    marginTop: 20,
    color: theme.colors.appBarFont,
    fontWeight: '700'
  }
})

const AppBarTab = ({tabName, linkName}) => {
  return (
    <Pressable>
      <Link to={linkName}><Text style={styles.tabA}>{tabName}</Text></Link>
    </Pressable>
  )
};

export default AppBarTab;