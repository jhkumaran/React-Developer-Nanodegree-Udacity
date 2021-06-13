import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class HomeComponent extends Component {
    render() {
        let user = this.props.users.find(u => u.id === this.props.activeUser);
        console.log(user);
        return (
            <div>
                {`Welcome ${user.name}`}
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
      },
      dispatch
  )

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent)
