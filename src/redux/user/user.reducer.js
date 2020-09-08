//a reducer is a function that recieves 2 properties: a state object that represents that last state or the initial state, which is an object, and then it recieves an action. that action is an object that has a type that is a string value.
import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;
