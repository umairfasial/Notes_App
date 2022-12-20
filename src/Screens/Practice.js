import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useSelector,useDispatch } from "react-redux";
import { update } from '../redux/action/Actions';

const Practice = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paswrdError, setpaswrdError] = useState('');

  const dispatch=useDispatch(); 

  const checkdata = () => {

    firestore()
  .collection('Signup')
  .where('Email', '==', email)
  .where('Password', '==', password)
  .get()
  .then((res) => {

// console.log('resss',res)

    if (res.docs.length > 0) {
      // if (
      //   querySnapshot.docs[0]._data.Email === email &&
      //   querySnapshot.docs[0]._data.Password === password
      // ) {
      //   alert('gooood')
        navigation.navigate('Updatefirestore')
      // }else{
      //   alert('wrong')
      // }
    } else {
      console.log('no account found');
    }
    res.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      // console.log('fiddfft',documentSnapshot)
     let data= documentSnapshot.data()
    //  console.log('data',data)
         dispatch(update(data))
    })
  });
    // firestore()
    //   .collection('Signup')
    //   .where('email', '==', email)
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('gooooo',querySnapshot.size);

        // if (querySnapshot.docs.length > 0) {
        //   if (
        //     querySnapshot.docs[0].data.email === email &&
        //     querySnapshot.docs[0].data.password === password
        //   ) {
        //     navigation.navigate('Notes')
        //   }else{
        //     alert('wrong')
        //   }
        // } else {
        //   console.log('no account');
        // }
    //   });
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    // console.log('user', user);
    setUser(user);
    if (initializing) setInitializing(false);
    console.log(initializing);
  }

  // const update = async () => {
  //   const data = {
  //     displayName: 'Alias',
  //     photoURL: 'https://my-cdn.com/assets/user/123.png',
  //   };

  //   await auth().currentUser.updateProfile(data);
  // };

  const loginfun = () => {
    setEmailError('');
    setpaswrdError('');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        console.log('jjj', res);
        await update();
        navigation.navigate('Notes');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        console.log('errrr', error.code);
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('Email is already in use');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setEmailError('Invalid Email');
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          setpaswrdError('Wrong Password.');
          console.log('Weak Password');
        }
      });
  };

  const Signoutfun = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    //  navigation.goBack();
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // if (!user) {
    return (
      <ScrollView style={styles.vew}>
        <Text style={styles.text}></Text>
        <Text style={styles.text2}>Firebase</Text>
        <Text style={styles.text3}>Login</Text>
        <TextInput
          value={email}
          onChangeText={text => setemail(text)}
          style={styles.form}
          placeholder="Email"></TextInput>
        {emailError ? (
          <Text style={{color: 'red', marginLeft: '6%'}}>{emailError}</Text>
        ) : null}

        <TextInput
          value={password}
          onChangeText={text => setpassword(text)}
          style={styles.form}
          placeholder="Password"></TextInput>
        {paswrdError ? (
          <Text style={{color: 'red', marginLeft: '6%'}}>{paswrdError}</Text>
        ) : null}
        <Text style={styles.frgt}>Forget Password?</Text>

        <TouchableOpacity
          // onPress={loginfun}
          onPress={checkdata}
          style={{
            backgroundColor: 'green',
            padding: 10,
            width: '90%',
            alignSelf: 'center',
            marginTop: '3%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={styles.blue}>
          Already have a account?<Text style={styles.ch}>Login</Text>
        </Text>
      </ScrollView>
    );
  }

  // return (
  //   <View style={{flex:1,justifyContent:'center',}}>
  //     <Text style={{alignSelf:'center',fontSize:22}}>Welcome {user.email}</Text>
  //     <TouchableOpacity
  //     onPress={Signoutfun}
  //     style={{
  //       backgroundColor: 'green',
  //       padding: 10,
  //       width: '90%',
  //       alignSelf: 'center',
  //       marginTop: '3%',
  //     }}>
  //     <Text
  //       style={{
  //         color: 'white',
  //         fontSize: 22,
  //         fontWeight: 'bold',
  //         textAlign: 'center',
  //       }}>
  //       Signout
  //     </Text>
  //   </TouchableOpacity>
  //   </View>
  // );
// };

export default Practice;

const styles = StyleSheet.create({
  vew: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: '20%',
  },
  text2: {
    fontSize: 30,
    color: '#FFCB2C',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '20%',
  },
  text3: {
    fontSize: 20,
    color: 'white',
    marginLeft: '5%',
    marginBottom: '2%',
  },
  form: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: '5%',
  },
  frgt: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: '3%',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
});
