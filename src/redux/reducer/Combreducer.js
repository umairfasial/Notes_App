import Profile from "./Reducer";


import { combineReducers } from "redux";

const Allreducers=combineReducers({
    profile:Profile,

})

export const Rootreducer=(state,action)=>{
    return Allreducers(state,action)
}