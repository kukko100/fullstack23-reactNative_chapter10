const { StyleSheet, Text } = require("react-native")
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  tabA: {
    flexGrow: 0,
    marginLeft: 20,
    marginTop: 20,
    color: theme.colors.appBarFont,
    fontWeight: '700'
  }
})

const AppBarTab = ({ tabName }) => {
  return (
      <Text style={styles.tabA}>user: {tabName}</Text>
  )
};

export default AppBarTab;