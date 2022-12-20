import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { update } from '../redux/action/Actions';

const Updatefirestore = () => {
  const [upto, setupto] = useState();
  const myState = useSelector(state => state.profile.Obj);
  const dispatch=useDispatch(); 

  console.log('upto', upto);
  useEffect(() => {
    getdata();
  }, []);

  const savedata = () => {
    dispatch(update(upto))
    firestore()
      .collection('Signup')
      .doc(upto.uid)
      .update(upto)
      .then(() => {
        console.log('User added!');
      });
  };

  const getdata = () => {
    setupto(myState);
  };

  return (
    <ScrollView style={styles.vew}>
      <Text style={styles.text}>Firebase</Text>
      <Text style={styles.text2}>Welcome to Firebase</Text>
      <Text style={styles.text3}>SignUp</Text>
      <TextInput
        onChangeText={value =>
          setupto(text => ({
            ...text,
            First_name: value,
          }))
        }
        style={styles.form}
        placeholder="First name">
        {upto?.First_name}
      </TextInput>
      <TextInput
        onChangeText={value =>
          setupto(text => ({
            ...text,
            Last_name: value,
          }))
        }
        style={styles.form}
        placeholder="Last name">
        {upto?.Last_name}
      </TextInput>
      <TextInput
        onChangeText={value =>
          setupto(text => ({
            ...text,
            Email: value,
          }))
        }
        style={styles.form}
        placeholder="Email">
        {upto?.Email}
      </TextInput>

      <TextInput
        secureTextEntry
        onChangeText={value =>
          setupto(text => ({
            ...text,
            Password: value,
          }))
        }
        style={styles.form}
        placeholder="Password">
        {upto?.Password}
      </TextInput>

      <TouchableOpacity
        onPress={savedata}
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
          update
        </Text>
      </TouchableOpacity>
      <Text style={styles.blue}>
        Already have a account?
        <Text style={styles.ch} onPress={() => navigation.navigate('Practice')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Updatefirestore;

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
});
