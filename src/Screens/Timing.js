import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Timing = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [store, setstore] = useState('');
 const [time, settime] = useState();
 const [day, setday] = useState('');
  const [sindex, setsindex] = useState();
  const [Select, setSelect] = useState([
    {
      key: 0,
      set: '8am-9am',
      selected: false,
    },
    {
      key: 1,
      set: '9am-10am',
      selected: false,
    },
    {
      key: 2,
      set: '10am-11am',
      selected: false,
    },
    {
      key: 3,
      set: '11am-12am',
      selected: false,
    },
    {
      key: 4,
      set: '12pm-1pm',
      selected: false,
    },
    {
      key: 5,
      set: '1pm-2pm',
      selected: false,
    },
    {
      key: 6,
      set: '2pm-3pm',
    },
    {
      key: 7,
      set: '3pm-4pm',
      selected: false,
    },
    {
      key: 8,
      set: '4pm-5pm',
      selected: false,
    },
    {
      key: 9,
      set: '6pm-7pm',
      selected: false,
    },
    {
      key: 10,
      set: '7pm-8pm',
      selected: false,
    },
    {
      key: 11,
      set: '8pm-9pm',
      selected: false,
    },
    {
      key: 12,
      set: '9pm-10pm',
      selected: false,
    },
    {
      key: 13,
      set: 'Closed',
    },
  ]);
  const [data, setdata] = useState([
    {
      Days: 'Monday',
      Time: [],
    },
    {
      Days: 'Tuesday',
      Time: [],
    },
    {
      Days: 'Wednesday',
      Time: [],
    },
    {
      Days: 'Thursday',
      Time: [],
    },
    {
      Days: 'Friday',
      Time: [],
    },
    {
      Days: 'Saturday',
      Time: [],
    },
    {
      Days: 'Sunday',
      Time: [],
    },
  ]);
  //    console.log('data',data)
//    console.log('store',day)

  const pressfun = item => {
    setstore(item);
    let arr = [...data];
    if (arr[sindex].Time.includes(item.set)) {
      let del = arr[sindex].Time.filter(i => i !== item.set);
      console.log('del', del);
      arr[sindex].Time = del;
      setdata(arr);
    } else if (item.set == 'Closed') {
      arr[sindex].Time = [item.set];
      // console.log('good', arr[sindex].Time)
      setdata(arr);
    } else {
      let cdel = arr[sindex].Time.filter(it => it !== 'Closed');
      // console.log('cdel',cdel)
      cdel.push(item.set);
      arr[sindex].Time = cdel;
      setdata(arr);
    }
         settime(arr[sindex].Time)
    console.log('first', arr[sindex].Time);
  };

  const savedata = () => {
    firestore()
      .collection('Time').doc('Time and days')
      .set({
    
        Time: data,
      })
      .then(() => {
        console.log('added!');
      });
  };

  const timepress = (item, index) => {
    // console.log('first',item.Days)
    setday(item.Days)
    setsindex(index);
    setModalVisible(true);
  };

  return (
    // <View style={{ flex: 1, margin: 10 }}>
    <View style={{padding: 10, backgroundColor: 'white'}}>
      <Text style={styles.schedule}>ScheduleTime</Text>
      <View style={styles.RowView}>
        <Text style={styles.days}>Days</Text>
        <Text style={styles.days}>Timings</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          // <View >

          <View style={styles.DaysViews}>
            <Text style={styles.DaysText}>{item.Days}</Text>
            {item.Time.length ? (
              <Text
                style={styles.TimeText}
                onPress={() => timepress(item, index)}>
                Updated
              </Text>
            ) : (
              <Text
                style={styles.TimeText}
                onPress={() => timepress(item, index)}>
                Select Timings
              </Text>
            )}
          </View>
        )}
      />
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={Select}
                numColumns={2}
                renderItem={({item, index}) => (
                  <View style={styles.ModalKaView}>
                    <Text
                      onPress={() => pressfun(item, index)}
                      style={{
                        borderRadius: 5,
                        padding: 5,
                        textAlign: 'center',
                        backgroundColor: data[sindex].Time.includes(item.set)
                          ? 'red'
                          : null,
                        borderWidth: 1,
                      }}>
                      {item.set}
                    </Text>
                  </View>
                )}
              />
              <Text>check value</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible), savedata();
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Calenderstrip')} style={{backgroundColor:'cyan',width:'20%',padding:10,alignSelf:'center'}}>
        <Text style={{textAlign:'center'}}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
    // </View>
  );
};
const styles = StyleSheet.create({
  setText: {},
  ModalKaView: {
    margin: 10,
    justifyContent: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    // height: responsiveScreenHeight(85),
    // width: responsiveScreenWidth(95),
    // margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  DaysViews: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DaysText: {
    color: 'black',
    // fontSize: responsiveFontSize(2),
  },
  TimeText: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 4,
  },
  days: {
    fontWeight: 'bold',
    // fontSize: responsiveFontSize(2)
  },
  RowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  schedule: {
    fontWeight: 'bold',
    // fontSize: responsiveFontSize(2.5)
  },
});
export default Timing;
