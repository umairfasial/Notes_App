import {StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image} from 'react-native'
  import React from 'react'
  import { GoogleSignin } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth'

  const GoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '479245795874-av547im79a2u8o4q68iqihnjsa1mm5o4.apps.googleusercontent.com',
    });
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }
    return (
      <View style={styles.container}>
      <View style={styles.topContent}>
       <Text style={styles.mainText}>
        Social Auth
       </Text>
      </View>
      <View style={styles.bottomContent}>
       <TouchableOpacity style={styles.googleButton}>
        <Image
         style={styles.googleIcon}
         source={{
          uri: "https://i.ibb.co/j82DCcR/search.png",
         }}
        />
        <Text style={styles.googleButtonText}
        onPress={() => onGoogleButtonPress().then(() => alert('Signed in with Google!'))}
        >Sign in with Google</Text>
       </TouchableOpacity>
      </View>
     </View>
    )
  }
  const styles = StyleSheet.create({
    safeArea: {
     backgroundColor: "#262B2F"
    },
    container: {
     height: Dimensions.get('window').height,
     backgroundColor: "#262B2F",
    },
    topContent: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
    },
    bottomContent: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
    },
    mainText: {
     fontSize: 54,
     color: "white",
    },
    googleButton: {
     backgroundColor: "white",
     borderRadius: 4,
     paddingHorizontal: 34,
     paddingVertical: 16,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center'
    },
    googleButtonText: {
     marginLeft: 16,
     fontSize: 18,
     fontWeight: '600'
    },
    googleIcon: {
     height: 24,
     width: 24
    }
   });
  export default GoogleSignIn