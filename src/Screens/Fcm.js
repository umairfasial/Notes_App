import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { useContext } from 'react';
import { MyContext } from './usecontext/Pracontext';

const Fcm = () => {
  const [notification, setnotification] = useState({
    title: undefined,
    body: undefined,
  });
 const data =[1,2,3,4,5,6]

const {first1, setfirst1, first2, setfirst2, first3, setfirst3} = useContext(MyContext);
  

  const [inputtitle, setinputtitle] = useState('');
  const [inputbody, setinputbody] = useState('');
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('first...', token);
  };
  async function bootstrap() {
    await inAppMessaging().setMessagesDisplaySuppressed(true);2
  }
  
  async function onSetup(user) {
    // await setupUser(user);
    // Allow user to receive messages now setup is complete
    inAppMessaging().setMessagesDisplaySuppressed(false);
  }

  useEffect(() => {
    bootstrap()
    onSetup()
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setnotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:111',
        JSON.stringify(remoteMessage),
      );
      setnotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          setnotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
          });
        }
      });
      
  }, []);

  // const PushNoti=async()=>{
  //     const token=await messaging().getToken();
  //     // alert(token)
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  // }

  // useEffect(() => {
  //   PushNoti();
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:111',
  //       remoteMessage.notification,
  //     );
  //       navigation.navigate(remoteMessage.data.type);
  //   });
  //   messaging().getInitialNotification(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:22',
  //       remoteMessage.notification,
  //     );
  //   });

  //   messaging().onMessage(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:333',
  //       remoteMessage.notification,
  //     );
  //   });

  // },)
  

  return (
    <View style={{flex:1}}>
      {/* <Text>Fcm</Text> */}
      <TextInput placeholder='title' style={{backgroundColor:'grey'}} onChangeText={text=>setinputtitle(text)} />
      <TextInput placeholder='body' style={{backgroundColor:'grey',marginTop:3}} onChangeText={text=>setinputbody(text)} />
      <TouchableOpacity onPress={()=> {setfirst1(first1 + 1),setfirst2(first2 + 1),setfirst3(first3 + 1)}} style={{backgroundColor:'cyan',padding:6,margin:8}}>
        <Text>
          Send
        </Text>
      </TouchableOpacity>
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`body: ${notification?.body}`}</Text>

      <Text style={{marginLeft:'5%'}}>{first1}</Text>
      <Text style={{marginLeft:'5%'}}>{first2}</Text>
      <Text style={{marginLeft:'5%'}}>{first3}</Text>
      
      
      <FlatList
      style={{backgroundColor:'pink',marginHorizontal:'10%'}}
      data={data}
      renderItem={({item,index})=>{
        return(
          <View>
          <Text style={{backgroundColor:'red',color:'cyan'}}>*</Text>
          </View>
        )
       
      }}
      />

 
    </View>
  );
};

export default Fcm;

const styles = StyleSheet.create({});
