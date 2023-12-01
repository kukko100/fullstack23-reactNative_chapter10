import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewBase } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../../hooks/useCreateReview';
import FormikTextInput from '../formikExpansions/FormikTextInput';
import FormikNumberInput from '../formikExpansions/FormikNumberInput';
import Constants from 'expo-constants';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    marginHorizontal: 10
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
  ownerName: yup
    .string()
    .required('Owner\'s username is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100'),
  text: yup
    .string(),
});

const CreateReviewForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  }

  const [createReview] = useCreateReview();

  const handleSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    
    try {
      const result = await createReview({ ownerName, repositoryName, rating, text });
      navigate('/');
    } catch (error) {
      console.log("Error in creating a review: ", error);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, }) => (
        <View style={styles.container}>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikNumberInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review" />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReviewForm;
