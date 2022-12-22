import {useState} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import axios from 'axios';

const GetApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState('');

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
        if (response.data) {
          setLoading(false);
          console.log('response', JSON.stringify(response.data.result));
          let resdata=response.data.result;
          let arr=[];
          let value=resdata.map(item=>{
             if(!arr.includes(item.name)){
              arr.push(item);
             }
          })
             setdata(arr)
          // console.log('first', value);
          // console.log('arr', arr);

          // setdata(uniqueArray)
          //   setTimeout(() => {
          //     setLoading(false);
          //   }, 3000);
        }
        if (response.data.message == 'Please enter all fields') {
          // console.log('first')
          alert('errrr');
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

  const delpress = (i) => {
    console.log('i',i.category_id)
    var data = JSON.stringify({
      category_id: i.category_id,
    });
    var config = {
      method: 'delete',
      url: 'https://unbox.thefirstsol.com/api/v1/category/delete',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwiZm5hbWUiOiJNdWhhbW1hZCIsImxuYW1lIjoidW1haXIiLCJlbWFpbCI6InVtYWlyQGdtYWlsLmNvbSIsIm5vX29mX2NoaWxkcmVuIjo1LCJkb2IiOiIxMi8wOS8yMDA4IiwiZ3JvY2VyeV9kYXlzIjoiW2BNb25kYXlgLCdGcmlkYXknXSIsInBhc3N3b3JkIjoiJDJhJDEyJEF2aGxMU21xVTlvQ3NrYjhyRkJ2T09RQzR0LmxFMy5JOWNXVy90eDdMbmRmTmNHeFF0cDZhIiwiYWxlcmdpZXMiOiIiLCJjYXRlZ29yaWVzIjoiIiwibXV0ZV9jYXRlZ29yaWVzIjoiIiwiaW1hZ2UiOiIiLCJyb2xlIjoiVXNlciIsImlzX2Jsb2NrZWQiOjAsImNyZWF0ZWRBdCI6IjIwMjItMTItMjBUMDg6MjM6MTcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjBUMDg6MjM6MTcuMDAwWiIsImlhdCI6MTY3MTUzOTE5M30.-m-5KROD98f2Kw5XIXRFdtmDKiR8x9OuuONijZQcrQ4',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data) {
          setLoading(false);

          console.log('response del', JSON.stringify(response.data));
             savedata();
          // setdata(response.data.result);
          //   setTimeout(() => {
          //     setLoading(false);
          //   }, 3000);
        }
        if (response.data.message == 'Please enter all fields') {
          // console.log('first')
          alert('errrr');
          // console.log('if')
        }
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log('error11', error);
      })
      .finally(function (final) {
        // always executed
        //   console.log('final',final);
      });
  };

  const render = ({item, index}) => {
    // console.log('item', item.category_id);
    return (
      <View
        style={{
          padding: 9,
          borderRadius: 10,
          marginBottom: '2%',
          flexDirection: 'row',
        }}>
        <Text onPress={()=>delpress(item)}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        style={{margin: 8}}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={render}
        // keyExtractor={Item => Item.id}
      />
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

export default GetApi;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
