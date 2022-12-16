import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Theme from '../utils/Themes';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//   import Custombtn from '../../component/Custombtn'

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [paswrdError, setpaswrdError] = useState('');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [numerr, setnumerr] = useState('');
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const phoneInput = useRef(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  function onAuthStateChanged(user) {
    console.log(user);
  }
  const savedata = () => {
    firestore()
      .collection('Signup')
      .add({
        First_name: firstname,
        Last_name: lastname,
        Email: email,
        Phone_number: formattedValue,
        Password: password,
      })
      .then(() => {
        console.log('User added!');
      });
  };

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
    setEmailError('');
    setpaswrdError('');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // navigation.replace('Notes');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('Email is already in use');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setEmailError('Invalid Email');
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          setpaswrdError(
            'Password must be a string with at least six characters.',
          );
          console.log('Weak Password');
        }
      });
  };

  const handlemail = () => {
    console.log('hlo', formattedValue);
    setEmailError('');
    setpaswrdError('');
    if (!email) {
      setEmailError('Email is Required');
    } else if (!password) {
      setpaswrdError('Password is Required');
    } else {
      signInWithPhoneNumber(formattedValue);
      savedata();
      authen();
    }
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
  console.log('first', code);
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      navigation.navigate('Notes');
    } catch (error) {
      alert('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <ScrollView style={styles.vew}>
        <Text style={styles.text}>Firebase</Text>
        <Text style={styles.text2}>Welcome to Firebase</Text>
        <Text style={styles.text3}>SignUp</Text>
        <TextInput
          value={firstname}
          onChangeText={text => setfirstname(text)}
          style={styles.form}
          placeholder="First name"></TextInput>
        <TextInput
          value={lastname}
          onChangeText={text => setlastname(text)}
          style={styles.form}
          placeholder="Last name"></TextInput>
        <TextInput
          value={email}
          onChangeText={text => setemail(text)}
          style={styles.form}
          placeholder="Email"></TextInput>
        {emailError ? (
          <Text style={{color: 'red', marginLeft: '6%'}}>{emailError}</Text>
        ) : null}

        <PhoneInput
          containerStyle={{
            marginTop: '4%',
            marginLeft: '5%',
            borderRadius: 10,
            width: '90%',
            height: '8%',
          }}
          textContainerStyle={{borderRadius: 10}}
          textInputStyle={{padding: -10}}
          ref={phoneInput}
          // defaultValue={value}
          defaultCode="PK"
          layout="first"
          onChangeFormattedText={text => {
            if (phoneInput.current?.isValidNumber(text)) {
              console.log('if');
              setnumerr('');
              setFormattedValue(text);
              // console.log('hlo',text)
              // setValid(true);
            } else {
              setFormattedValue('');
              console.log('else');
              setnumerr('Invalid Number');
            }
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        {numerr ? (
          <Text style={{color: 'red', marginLeft: '6%'}}>{numerr}</Text>
        ) : null}
        <TextInput
          value={password}
          onChangeText={text => setpassword(text)}
          style={styles.form}
          placeholder="Password"></TextInput>
        {paswrdError ? (
          <Text style={{color: 'red', marginLeft: '6%'}}>{paswrdError}</Text>
        ) : null}

        {/* <Text style={styles.frgt}>Forget Password?</Text> */}

        <TouchableOpacity
          // onPress={handlemail}
          // onPress={savedata}
          // onPress={() => navigation.navigate('Practice')}
          onPress={() => navigation.navigate('Timing')}
          // onPress={() => {
          //       console.log('hloo',valid)
          //   const checkValid = phoneInput.current?.isValidNumber(value);
          //   setShowMessage(true);
          //   setValid(checkValid ? checkValid : false);
          // }}
          style={{
            backgroundColor: '#FFCB2C',
            padding: 10,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: '5%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            SignUp
          </Text>
        </TouchableOpacity>
        <Text style={styles.blue}>
          Already have a account?
          <Text
            style={styles.ch}
            onPress={() => navigation.navigate('Practice')}>
            Login
          </Text>
        </Text>
      </ScrollView>
    );
  }
  return (
    <View>
      <OTPInputView
        style={{width: '80%', height: 200, alignSelf: 'center'}}
        pinCount={6}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          setCode(code);
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#FFCB2C',
          padding: 10,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: '5%',
        }}
        onPress={() => confirmCode()}>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  vew: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 25,
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
    marginBottom: '2%',
  },
  text3: {
    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFCB2C',
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
    color: 'white',
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
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 50,
    backgroundColor: 'black',
    height: 45,
    borderWidth: 3,
    borderBottomWidth: 3,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
