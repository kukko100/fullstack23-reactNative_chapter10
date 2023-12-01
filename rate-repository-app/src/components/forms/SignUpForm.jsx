import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from '../formikExpansions/Text';
import FormikTextInput from '../formikExpansions/FormikTextInput';
import theme from '../../utils/theme';
import Constants from 'expo-constants';
import * as yup from 'yup'
import useCreateUser from '../../hooks/useCreateUser';
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
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username can't be more than 30 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password can't be more than 50 characters long"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref('password'), null], "Passwords must match")
});


const SignUpForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: ''
  };

  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();

  const handleSignUp = async (values) => {
    const { username, password } = values;

    try {
      const result = await createUser({ username, password });
      const resultSignIn = await signIn({ username, password })
      if (result instanceof Error === false && resultSignIn instanceof Error === false) {
        navigate('/');
      }
    } catch (e) {
      console.log("Error at sign up form: ", e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignUp}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <FormikTextInput name ="passwordConfirmation" placeholder="Password confirmation" />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
