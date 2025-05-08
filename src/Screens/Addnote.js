import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../utils/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

const Addnote = ({navigation}) => {
  const [title, settitle] = useState('');
  const [note, setnote] = useState('');

  const add = async () => {
    const value = await AsyncStorage.getItem('notes');
    const obj = JSON.parse(value);

    if (obj?.length) {
      console.log('if');

      let array = [...obj];

      if (!title) {
        alert('Please Add your Title');
      } else if (!note) {
        alert('Please Add your Note');
      } else {
        let data = {title, note};
        array.unshift(data);
        const info = JSON.stringify(array);

        await AsyncStorage.setItem('notes', info);
        // console.log('info',info)
        navigation.navigate('Notes');
      }
    } else {
      let data = {title, note};
      let arr = [];
      arr.unshift(data);
      // console.log('else',arr)
      await AsyncStorage.setItem('notes', JSON.stringify(arr));
      navigation.navigate('Notes');
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingVertical: 4, paddingHorizontal: 4}}>
        <Icon
          name="arrow-back"
          size={40}
          color={Theme.Orange}
          onPress={() => navigation.goBack()}
        />
        <View style={{paddingVertical: 10}}>
          <TextInput
            style={{...styles.form, fontWeight: 'bold'}}
            placeholder="Title"
            value={title}
            onChangeText={text => settitle(text)}></TextInput>
          <TextInput
            style={{...styles.form, textAlignVertical: 'top', height: '65%'}}
            placeholder="Note"
            multiline={true}
            value={note}
            onChangeText={text => setnote(text)}></TextInput>
        </View>
      </View>
      <TouchableOpacity
        onPress={add}
        style={{
          width: '95%',
          backgroundColor: Theme.Orange,
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          bottom: '5%',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 10,
          }}>
          ADD
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addnote;

const styles = StyleSheet.create({
  form: {
    backgroundColor: Theme.lightgrey,
    width: '95%',
    alignSelf: 'center',
    marginBottom: '3%',
    borderRadius: 10,
    fontSize: 16,
  },
});
