import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RiReactjsFill } from 'react-icons/ri'
import UsersDropdown from '../controls/usersDropdown/UsersDropdown'
import './signIn.css'
import * as userAction from '../../actions/userAction'
import { withRouter } from 'react-router-dom'

export class SignInComponent extends Component {
    state = {
        user: undefined
    }

    componentDidMount(){
        this.props.setActiveUser(null);
        this.setState({user: undefined})
    }

    handleChange = (user) => {
        this.setState({
            user: user
        })
    }

    signIn = (e) => {
        e.preventDefault();
        this.props.setActiveUser(this.state.user.id);
        this.props.history.push('/home');
    }

    render() {
        let user = this.props.users.find(u => u.id === this.props.activeUser);
        return (
            <div className='container'>
                <div className='header'>
                    <div className='welcome-message'>
                        Welcome to the Would You Rather App
                    </div>
                    <div className='sign-in-message'>
                        Please sign in to continue
                    </div>
                </div>
                <RiReactjsFill className='react-icon'/>
                <div className='sign-in-body'>
                    <div className='sign-in-text'>
                        Sign In
                    </div>
                    <UsersDropdown items={this.props.users} selectedItem={user} handleChange={this.handleChange}/>
                    <button className='sign-in-button' onClick={(e) => this.signIn(e)}>
                        Sign In
                    </button>
                </div>
            </div>
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
          ...userAction
      },
      dispatch
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInComponent))
