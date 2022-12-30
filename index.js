import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging  from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import Fcm from './src/Screens/Fcm';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
