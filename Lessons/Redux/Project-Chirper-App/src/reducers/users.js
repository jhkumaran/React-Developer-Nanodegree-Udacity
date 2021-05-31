import { RECEVIE_USERS } from '../action/users'

export default function users(state = {}, action){
    switch(action.type){
        case RECEVIE_USERS:
            return{
                ...state,
                ...action.users
            }
        default:
            return state;
    }
}