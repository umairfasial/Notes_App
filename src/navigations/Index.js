import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from '../Screens/Notes';
import Addnote from '../Screens/Addnote';
import Recentdelscr from '../Screens/Recentdelscr';
import Login from '../Screens/Login';
import Practice from '../Screens/Practice';
import Pract1 from '../Screens/Pract1';
import Timing from '../Screens/Timing';
import Calenderstrip from '../Screens/Calenderstrip';
import Updatefirestore from '../Screens/Updatefirestore';


const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'  screenOptions={{headerShown:false}}>
    <Stack.Screen name="Practice" component={Practice} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Notes" component={Notes} />
    <Stack.Screen name="Addnote" component={Addnote} />
    <Stack.Screen name="Recentdelscr" component={Recentdelscr} />
    <Stack.Screen name="Pract1" component={Pract1} />
     <Stack.Screen name="Timing" component={Timing} />
     <Stack.Screen name="Calenderstrip" component={Calenderstrip} />
     <Stack.Screen name="Updatefirestore" component={Updatefirestore} />


    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Index

const styles = StyleSheet.create({})