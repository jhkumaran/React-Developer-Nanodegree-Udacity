import userReducer from './userReducer'
import questionsReducer from './questionsReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    userReducer: userReducer,
    questionsReducer: questionsReducer
})