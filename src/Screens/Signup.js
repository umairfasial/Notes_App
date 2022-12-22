import {useState} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import axios from 'axios';
const Signup = ({navigation}) => {
  // const axios = require('axios');
  const [loading, setLoading] = useState(false);
  const [upto, setupto] = useState();
  
  const savedata = () => {
      setLoading(true);
    var data = '';
    var config = {
      method: 'get',
      url: 'https://unbox.thefirstsol.com/api/v1/category/get',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwiZm5hbWUiOiJNdWhhbW1hZCIsImxuYW1lIjoidW1haXIiLCJlbWFpbCI6InVtYWlyQGdtYWlsLmNvbSIsIm5vX29mX2NoaWxkcmVuIjo1LCJkb2IiOiIxMi8wOS8yMDA4IiwiZ3JvY2VyeV9kYXlzIjoiW2BNb25kYXlgLCdGcmlkYXknXSIsInBhc3N3b3JkIjoiJDJhJDEyJEF2aGxMU21xVTlvQ3NrYjhyRkJ2T09RQzR0LmxFMy5JOWNXVy90eDdMbmRmTmNHeFF0cDZhIiwiYWxlcmdpZXMiOiIiLCJjYXRlZ29yaWVzIjoiIiwibXV0ZV9jYXRlZ29yaWVzIjoiIiwiaW1hZ2UiOiIiLCJyb2xlIjoiVXNlciIsImlzX2Jsb2NrZWQiOjAsImNyZWF0ZWRBdCI6IjIwMjItMTItMjBUMDg6MjM6MTcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjBUMDg6MjM6MTcuMDAwWiIsImlhdCI6MTY3MTUzOTE5M30.-m-5KROD98f2Kw5XIXRFdtmDKiR8x9OuuONijZQcrQ4',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if(response.data){
            setLoading(false)
            console.log('response', JSON.stringify(response.data));
        //   setTimeout(() => {
        //     setLoading(false);
        //   }, 3000);
        }
        if (response.data.message == 'Please enter all fields') {
          // console.log('first')
                alert('errrr')
          // console.log('if')
          
        
        }
        // handle success
        
      })
      .catch(function (error) {
        // handle error
        console.log('error', error);
      })
      .finally(function (final) {
        // always executed
        //   console.log('final',final);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
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
          onPress={()=>navigation.navigate('GetApi')}
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
          <Text
            style={styles.ch}
            onPress={() => navigation.navigate('Practice')}>
            Login
          </Text>
        </Text>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: '20%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
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
