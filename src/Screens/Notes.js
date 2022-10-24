import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ThemeProvider} from '@react-navigation/native';
import Theme from '../utils/Themes';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notes = ({navigation, route}) => {
  // const {itom} = route.params;
  const [data, setdata] = useState();
  const [upto, setupto] = useState();
  const [ind, setind] = useState();
  const [del, setdel] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const deleteitem = async val => {
    let a = data;
    let arr = a.filter(item => {
      return item !== val;
    });
    console.log('del',arr)
    setdata(arr);
    await AsyncStorage.setItem('notes', JSON.stringify(arr));
  };

  const render = ({item,index}) => {
   
    return (
      <View
        style={{
          backgroundColor: Theme.lightgrey,
          padding: 9,
          borderRadius: 10,
          marginBottom: '2%',
          flexDirection: 'row',
        }}>
        <View style={{width: Theme.width / 1.4}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.title}</Text>
          <Text numberOfLines={8} multiline={true} style={{fontSize: 18}}>
            {item.note}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '20%',
            // alignSelf:'center'
          }}>
          <AntDesign
            onPress={() => Updatenote(item,index)}
            name="edit"
            size={25}
            color={Theme.Orange}
          />
          <AntDesign
            onPress={() => deleteitem(item)}
            name="delete"
            size={25}
            color={Theme.Orange}
          />
        </View>
      </View>
    );
  };

  const Updatenote = (item,index) => {
    // console.log('first',index)
    setind(index);
    setupto(item);
    setModalVisible(true);
  };
//update
  const Updatebtn = async upto => {
      let newarr =[...data]
      newarr[ind]=upto;
      //  data[ind] = upto;
    setdata(newarr);
       
    await AsyncStorage.setItem('notes', JSON.stringify(newarr));
    setModalVisible(false);
  };

  const store = async () => {
    const value = await AsyncStorage.getItem('notes');
    // console.log('first', value);
    const obj = JSON.parse(value);
    setdata(obj);
  };
  useEffect(() => {
    store();
    navigation.addListener('focus', () => {
      store();
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: Theme.Orange}}>
          Notes
        </Text>
        <Entypo name="dots-three-vertical" size={25} color={Theme.Orange} />
      </View>
      <View style={styles.vew}>
        <Icon name="search" size={25} color={Theme.Black} />
        <TextInput style={{width: '90%'}} placeholder="Search"></TextInput>
      </View>
      {data?.length ? (
        <FlatList
          style={{margin: 8}}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={render}
          // keyExtractor={Item => Item.id}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: 'arial',
            }}>
            No Notes to Show
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('Addnote')}
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: '5%',
          marginRight: '5%',
        }}>
        <Icon name="add-circle" size={70} color={Theme.Orange} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Title</Text>
            <TextInput
              onChangeText={value =>
                setupto(text => ({
                  ...text,
                  title: value,
                }))
              }
              style={{backgroundColor: Theme.lightgrey}}>
              {upto?.title}
            </TextInput>
            <Text>Note</Text>
            <TextInput
              multiline={true}
              onChangeText={value =>
                setupto(text => ({
                  ...text,
                  note: value,
                }))
              }
              style={{backgroundColor: Theme.lightgrey}}>
              {upto?.note}
            </TextInput>
            <TouchableOpacity
              onPress={() => Updatebtn(upto)}
              style={{
                width: '40%',
                backgroundColor: Theme.Orange,
                alignSelf: 'center',
                padding: 5,
                marginTop: '4%',
              }}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                width: '40%',
                backgroundColor: Theme.Orange,
                alignSelf: 'center',
                padding: 5,
                marginTop: '4%',
              }}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  vew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: Theme.white,
    paddingVertical: 50,
    borderRadius: 10,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
