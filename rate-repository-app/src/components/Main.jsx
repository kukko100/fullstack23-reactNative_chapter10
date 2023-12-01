import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './commonViewRepositories/RepositoryList';
import AppBar from './appBar/AppBar';
import theme from '../utils/theme';
import SignIn from './userControl/SignIn';
import RepositoryItemInfo from './commonViewRepositories/RepositoryItemInfo';
import CreateReviewForm from './forms/CreateReviewForm';
import SignUpForm from './forms/SignUpForm';
import UsersReviews from './userView/UsersReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/singleView" element={<RepositoryItemInfo />} />
        <Route path="/createReview" element={<CreateReviewForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/userView" element={<UsersReviews />} />
      </Routes>
    </View>
  );
};

export default Main;