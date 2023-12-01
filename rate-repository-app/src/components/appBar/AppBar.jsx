import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../utils/theme';
import AppBarTab from './AppBarTab';
import AppBarText from './AppBarText'
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { useContext, useState } from 'react';
import { ME } from '../../graphql/queries'
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import LogOutButton from '../userControl/LogOutButton';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingHorizontal: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  flexItemA: {
    flexGrow: 0,
    marginLeft: 20,
    marginTop: 20,
    color: theme.colors.appBarFont,
    fontWeight: '700'
  }
});

const AppBar = () => {
  const { data, loading } = useQuery(ME);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        setLoggedInUser(data.me.username);
      } else {
        setLoggedInUser('');
      }
    }
  }, [loading, data]);
  
  

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName={"Repositories"} linkName={"/"} />
        {loggedInUser ? (
          <>
            <AppBarTab tabName={"Create review"} linkName={"/createReview"} />
            <LogOutButton tabName={"Sign out"} />
            <AppBarTab tabName={loggedInUser} linkName={"/userView"} />
          </>
        ) : (
          <>
            <AppBarTab tabName={"Sign in"} linkName={"/signIn"} />
            <AppBarTab tabName={"Sign up"} linkName={"/signUp"} />
          </>
          
        )}
      </ScrollView>
    </View>
  )
};

export default AppBar;