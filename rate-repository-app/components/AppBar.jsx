import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName={"Repositories"} linkName={"/"}/>
        <AppBarTab tabName={"Sign in"} linkName={"/signIn"}/>
      </ScrollView>
    </View>
  )
};

export default AppBar;