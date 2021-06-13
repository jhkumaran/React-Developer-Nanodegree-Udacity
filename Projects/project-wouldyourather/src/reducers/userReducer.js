import * as actionConstants from '../actions/constants'

const initialState = {
    users:[],
    activeUser: null
}

export default function users(state = initialState, action){

    switch(action.type){
        case actionConstants.SET_USER:
            return {
                ...state,
                activeUser: action.activeUser
            };
        case actionConstants.GET_USERS:
            console.log(action.users);
            return{
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}