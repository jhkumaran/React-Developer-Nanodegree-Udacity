import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import * as userAction from './actions/userAction'
import * as questionsAction from './actions/questionsAction'
import SignInComponent from './components/signIn/SignInComponent'
import HomeComponent from './components/home/HomeComponent'
import NavComponent from './components/nav/NavComponent'
import NewQuestionComponent from './components/newQuestion/NewQuestionComponent'
import QuestionComponent from './components/question/QuestionComponent'
import LeaderBoardComoponent from './components/leaderboard/LeaderBoardComoponent'

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
            <div>
              <NavComponent/>
              <Route path='/' exact component={SignInComponent}/>
              <Route path='/home' component={HomeComponent}/>
              <Route path='/add' component={NewQuestionComponent}/>
              <Route path='/question/:question_id' component={QuestionComponent}/>
              <Route path='/leaderboard' component={LeaderBoardComoponent}/>
            </div>
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
