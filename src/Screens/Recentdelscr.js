import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Theme from '../utils/Themes'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Recentdelscr = ({navigation}) => {
  const [data, setdata] = useState();

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
        {/* <View
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
        </View> */}
      </View>
    );
  };
    
    const deldata = async () => {
        const value = await AsyncStorage.getItem('delete');
        // console.log('first', value);
        const obj = JSON.parse(value);
        setdata(obj);
      
      };
      useEffect(() => {
        deldata();
        navigation.addListener('focus', () => {
          deldata();
        });
      }, []);
  return (
    <View style={{flex:1,padding:6}}>
      <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign:'center',
              fontFamily: 'arial',
              color:Theme.Orange
            }}>Recently Deleted</Text>
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
            
    </View>
  )
}

export default Recentdelscr

const styles = StyleSheet.create({})