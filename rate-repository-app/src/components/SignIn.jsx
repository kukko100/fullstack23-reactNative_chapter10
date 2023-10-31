import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../utils/theme';
import Constants from 'expo-constants';
import * as yup from 'yup'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.colors.itemLanguageButton,
    paddingHorizontal: 100,
    padding: 10,
    borderRadius: 4,
    marginTop: 10
  },
  buttonText: {
    color: theme.colors.languageButtonFont,
    textAlign: 'center',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required(),
  password: yup
    .string()
    .required()
})


const SignIn = () => {
  const initialValues = {
    username: '',
  };

  const handleSignIn = (values) => {
    console.log('Sign-in values:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignIn}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
