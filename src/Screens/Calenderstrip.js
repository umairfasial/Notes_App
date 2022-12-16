import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useState} from 'react'
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore';


const Calenderstrip = () => {
  const [data, setdata] = useState();
  
 const check=(date)=>{
          
  let day =date?.format('dddd')


  firestore()
  .collection('Time')
  .get()
  .then(querySnapshot => {
    // console.log('Total users: ', querySnapshot.docs.data)
    querySnapshot.forEach(documentSnapshot => {
      // console.log('User ID: ', documentSnapshot.data().Time);
      let timedata =documentSnapshot.data().Time
      
  timedata?.filter(item=>{
    if(item.Days == day){
      setdata(item.Time)
    }
  })
  
    });
  });
 }
 


  return (
    <View style={styles.container}>
    <CalendarStrip
       calendarAnimation={{type: 'sequence', duration: 30}}
       daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 3, borderHighlightColor: '#4D408F'}}
       style={{height: 100, paddingTop: 20, paddingBottom: 10}}
       calendarHeaderStyle={{color: 'grey',marginBottom:'3%'}}
      //  calendarColor={'#7743CE'}
       dateNumberStyle={{color: 'grey'}}
       dateNameStyle={{color: 'black',fontSize:16}}
       highlightDateNumberStyle={{color: '#4D408F'}}
       highlightDateNameStyle={{color: '#4D408F'}}
       iconContainer={{flex: 0.1}}
      onDateSelected={text =>check(text)}
  
    />
     <FlatList
        data={data}
        numColumns={2}
        renderItem={({item, index}) => (
          <View style={{padding:10}}>
              <Text style={{padding:25}}>{item}</Text>
          </View>
        )}
      />
  </View>
  )
}

export default Calenderstrip

const styles = StyleSheet.create({
  container: { flex: 1,paddingHorizontal:10 }
});