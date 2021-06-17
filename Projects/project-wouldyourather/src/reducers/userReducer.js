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
            return{
                ...state,
                users: action.users
            }
        case actionConstants.UPDATE_USER:
            return updateUser(state,action);
        default:
            return state;
    }
}

const updateUser = (state, action) => {
    let newUsers = [...state.users];
    let userIndex = newUsers.findIndex(t=> t.id === action.user.id);
    newUsers[userIndex] = action.user;
    return {
        ...state,
        users: newUsers
    };
}