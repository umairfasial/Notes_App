import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

const Fcm = () => {
  const [notification, setnotification] = useState({
    title: undefined,
    body: undefined,
  });
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('first...', token);
  };

  useEffect(() => {
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
    <View style={{flex:1,alignSelf:'center',justifyContent:'center'}}>
      {/* <Text>Fcm</Text> */}
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`body: ${notification?.body}`}</Text>
    </View>
  );
};

export default Fcm;

const styles = StyleSheet.create({});
