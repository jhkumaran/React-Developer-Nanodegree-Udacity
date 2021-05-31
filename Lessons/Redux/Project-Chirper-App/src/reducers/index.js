import tweets from './tweet'
import users from './users'
import authedUser from './authedUser'
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    tweets,
    users,
    authedUser,
    loadingBar: loadingBarReducer
})