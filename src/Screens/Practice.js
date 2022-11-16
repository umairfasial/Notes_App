import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const Practice = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
        console.log('user',user)
      setUser(user);
      if (initializing) setInitializing(false);
      console.log(initializing)
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    if (!user) {
      return (
        <View style={{flex:1,justifyContent:'center',}}>
          <Text style={{alignSelf:'center',fontSize:22}}>Login</Text>
        </View>
      );
    }
  
    return (
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    );
}

export default Practice

const styles = StyleSheet.create({})