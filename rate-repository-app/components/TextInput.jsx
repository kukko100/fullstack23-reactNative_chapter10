import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const TextInput = ({ error, ...props }) => {
  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 240,
      borderColor: error ? theme.colors.textError : 'gray',
      borderWidth: 1,
      borderRadius: 4,
      paddingLeft: 10,
      marginTop: 10,
    },
  });

  return <NativeTextInput style={styles.input} {...props} />;
};

export default TextInput;