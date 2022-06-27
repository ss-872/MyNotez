import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import { UserLoginReducer, UserRegisterReducer, UserUpdateReducer } from './reducers/userReducers';
import {notecreateReducer, noteDeleteReducer, noteListReducer, noteupdateReducer} from './reducers/noteReducers'
const userInfoFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
const   reducer=combineReducers({
    //this is will contain our reducers 
    userLogin:UserLoginReducer,
    userRegister:UserRegisterReducer,
    noteList:noteListReducer,
    noteCreate:notecreateReducer,
    noteUpdate:noteupdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate:UserUpdateReducer
})
const initialState={
    userLogin:{userInfo:userInfoFromStorage}
};
const middleware=[thunk];
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store