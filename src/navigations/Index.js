import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from '../Screens/Notes';
import Addnote from '../Screens/Addnote';
import Recentdelscr from '../Screens/Recentdelscr';


const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Notes'  screenOptions={{headerShown:false}}>
    <Stack.Screen name="Notes" component={Notes} />
    <Stack.Screen name="Addnote" component={Addnote} />
    <Stack.Screen name="Recentdelscr" component={Recentdelscr} />


    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Index

const styles = StyleSheet.create({})