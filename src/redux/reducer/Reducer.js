const initialState = {
  Obj: {},
};

const Profile = (state = initialState, action) => {
  console.log('Payload: ', action.payload);
  switch (action.type) {
    case 'Sdata':
      return {
        // ...state,
        Obj: {...action.payload},
      };
    default:
      return state;
  }
  // switch(action.type){
  //     case 'Increment':return state + 1;
  //     case 'Decrement':return state > 1 ? state - 1 : 0;
  //     default :return state;
  // }
};

export default Profile;
