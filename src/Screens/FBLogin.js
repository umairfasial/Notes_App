import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LoginButton, AccessToken,Profile } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const FBLogin = () => {
//   const provider = new FacebookAuthProvider();
//   provider.addScope('user_birthday');
//   const auth = getAuth();
// auth.languageCode = 'it';
  return (
    <View style={{flex:1}}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
                console.log('first',result)
                console.log('err',error)
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                     auth().signInWithCredential(facebookCredential);
                    console.log('fir data', data)
                    console.log(data.accessToken.toString())
                  }
                  
                )
                const currentProfile = Profile.getCurrentProfile().then(
                    function(currentProfile) {
                      if (currentProfile) {
                        console.log('currrent',currentProfile)
                        console.log("The current logged user is: " +
                          currentProfile.name
                          + ". His profile id is: " +
                          currentProfile.userID
                        );
                  
                      }
                    }
                  );
              }
       
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
    </View>
  )
}

export default FBLogin

const styles = StyleSheet.create({})