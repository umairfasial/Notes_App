import { StyleSheet, Text, View,Button, TextInput } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, { useState,useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const Pract1 = () => {


  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // function onAuthStateChanged(user) {
  //  console.log('user',user)
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
console.log('first',code)
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      alert('good')
    } catch (error) {
      alert('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
    
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+923004979161')}
      />
    );
  }

  // return (
  //   <>
  //     <TextInput value={code} onChangeText={text => setCode(text)} />
  //    
  //   </>
  // );

  
  return (
    <View>
      <Text>Pract1</Text>
      <OTPInputView
      
    style={{width: '80%', height: 200,alignSelf:'center',}}
    pinCount={6}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad={false}
  
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
      setCode(code)
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>
<Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  )
}

export default Pract1

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 50,
    backgroundColor:'black',
    height: 45,
    borderWidth: 3,
    borderBottomWidth: 3,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
})