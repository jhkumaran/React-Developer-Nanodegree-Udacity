import * as API from '../utils/api'
import * as constants from './constants';

export const getAllUsers = () => async dispatch => {
    const result = await API.getAllUsers();
    console.log(result.users);
    dispatch({
        type: constants.GET_USERS,
        users : result.users
    });
}

export const setActiveUser = (activeUser) => async dispatch => {
    dispatch({
        type: constants.SET_USER,
        activeUser
    })
}