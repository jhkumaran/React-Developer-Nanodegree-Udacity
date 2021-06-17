import React, { Component, Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import './navStyles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from '../../actions/userAction'
import { withRouter } from 'react-router-dom'

export class NavComponent extends Component {
    logout = () => {
        this.props.setActiveUser(null);
        this.props.history.push('/');
    }

    render() {
        let user = this.props.users.find(u => u.id === this.props.activeUser);
        return user !== undefined ? (
            <Fragment>
                <div className='nav-container'>
                    <div className='nav'>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            LeaderBoard
                        </NavLink>
                    </div>
                    <div className='user-hello'>
                        {`Hello, ${user.name}`}
                        <img src={user.avatarURL} className='user-img'
                            alt={`Avatar of ${user.name}`}/>
                        <div className='logout' onClick={this.logout}>
                            Logout
                        </div>
                    </div>
                </div>
                <div className='line-break'/>
                
            </Fragment>
        ) : null
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavComponent))
