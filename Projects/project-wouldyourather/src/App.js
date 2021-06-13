import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import * as userAction from './actions/userAction'
import * as questionsAction from './actions/questionsAction'
import SignInComponent from './components/signIn/SignInComponent'
import HomeComponent from './components/home/HomeComponent'
import NavComponent from './components/nav/NavComponent'

class App extends Component {
  componentDidMount(){
    this.loadInitialData();
  }

  loadInitialData(){
    this.props.getAllUsers();
    this.props.getAllQuestions();
  }

  render() {
    return (
      <Fragment>
        {
          this.props.activeUser === null ?
          (
            <Route path='/' component={SignInComponent}/>
          ):
          (
            <div>
              <NavComponent/>
              <Route path='/home' exact component={HomeComponent}/>
            </div>
          )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
  activeUser: state.userReducer.activeUser
})

const mapDispatchToProps = (dispatch) => 
  bindActionCreators(
    {
      ...userAction,
      ...questionsAction
    },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
