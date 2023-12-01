import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from '../formikExpansions/Text';
import FormikTextInput from '../formikExpansions/FormikTextInput';
import theme from '../../utils/theme';
import Constants from 'expo-constants';
import * as yup from 'yup'
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';



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
});


const SignIn = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: ''
  };

  const [signIn] = useSignIn();

  const handleSignIn = async (values) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      if (result instanceof Error === false) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
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
