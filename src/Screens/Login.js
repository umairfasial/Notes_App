import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../utils/Themes';
import auth from '@react-native-firebase/auth';
//   import Custombtn from '../../component/Custombtn'

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paswrdError, setpaswrdError] = useState('');

  // if(!email){
  //   alert('Please enter your mail')
  //   return false;
  // }else if(!password){
  //   alert('Password not found')
  //   return false;
  // }else{
  // return true;
  // }
  const authen = () => {
    setEmailError('')
    setpaswrdError('')
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        navigation.navigate('Practice');
        console.log('User account created & signed in!',);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('Email is already in use')
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setEmailError('Invalid Email')
          console.log('That email address is invalid!');
        }

        if(error.code ==='auth/weak-password'){
          setpaswrdError('Password must be a string with at least six characters.')
          console.log('Weak Password')
        }

        
      });
  };

  const handlemail = () => {
    setEmailError('')
    setpaswrdError('')
if(!email){
setEmailError('Email is Required')
}else if(!password){
  setpaswrdError('Password is Required')
}else{
  authen();

}
    
    
  };

  return (
    <ScrollView style={styles.vew}>
      <Text style={styles.text}>PEPPER PRO</Text>
      <Text style={styles.text2}>Welcome to Pepper Pro</Text>
      <Text style={styles.text3}>Login</Text>
      <TextInput
        value={email}
        onChangeText={text => setemail(text)}
        style={styles.form}
        placeholder="Email"></TextInput>
      {emailError ? (
        <Text style={{color: 'red', marginLeft: '6%'}}>
          {emailError}
        </Text>
      ) : null}

      <TextInput
        value={password}
        onChangeText={text => setpassword(text)}
        style={styles.form}
        placeholder="Password"></TextInput>
        {paswrdError ? (
        <Text style={{color: 'red', marginLeft: '6%'}}>
          {paswrdError}
        </Text>
      ) : null}
      <Text style={styles.frgt}>Forget Password?</Text>

      <TouchableOpacity
        onPress={handlemail}
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
};

export default Login;

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
    fontSize: 16,
    color: 'white',
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
  opcty: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Theme.backgroundcolor3,
    marginTop: '30%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btntxt: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  blue: {
    fontSize: 20,
    color: Theme.text2color,
    marginTop: '10%',
    alignSelf: 'center',
  },
  ch: {
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: Theme.text2color,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  modl: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modl1: {
    fontSize: 20,
  },
  clsbtn: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: Theme.text3color,
    marginTop: '25%',
  },
});
