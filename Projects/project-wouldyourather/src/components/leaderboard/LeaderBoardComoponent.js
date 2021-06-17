import React, { Component } from 'react'
import UserScoreComponent from './UserScoreComponent'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class LeaderBoardComoponent extends Component {
    render() {
        let users = [...this.props.users];
        users = users.sort((a,b) => b.score - a.score);
        console.log(users);
        return (
            <>
                {
                    users.map((user, index) => (
                        <UserScoreComponent user={user} key={index}/>
                    ))
                }
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    users: state.userReducer.users,
})
  
  const mapDispatchToProps = (dispatch) => 
    bindActionCreators(
      {
      },
      dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardComoponent)
