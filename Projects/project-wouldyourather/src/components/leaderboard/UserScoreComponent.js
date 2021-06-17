import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './userScore.css'

export class UserScoreComponent extends Component {
    state = {
        user: undefined,
        answeredPts: 0,
        createdPts: 0,
    }

    componentDidMount(){
        console.log(this.props.user);
        this.updateUserDetails(this.props.user);
    }

    updateUserDetails = (user) => {
        let answeredPts = user.answeredQuestions.length;
        let createdPts = this.props.questions.filter(t=> t.createdUser === user.id).length;
        this.setState({
            user,
            answeredPts,
            createdPts
        }, () => console.log(this.state))
    }

    render() {
        const {user, answeredPts, createdPts } = this.state;
        return user !== undefined ? (
            <div className='score-container'>
                <img className='score-img' src={user.avatarURL}
                        alt={`Avatar of ${user.name}`}/>
                <div className='user-info'>
                    <div className='user-name'>
                        {user.name}
                    </div>
                    <div style={{display: 'flex', marginLeft: '10px'}}>
                        <div style={{width:'300px'}}>
                            Answered Questions
                        </div>
                        <div>
                            {answeredPts}
                        </div>
                    </div>
                    <div style={{display: 'flex', marginLeft: '10px', marginTop: '10px'}}>
                        <div style={{width:'300px'}}>
                            Created Questions
                        </div>
                        <div>
                            {createdPts}
                        </div>
                    </div>
                    
                </div>
                <div className='score-info-container'>
                    <div className='score-info-header'>
                        Score
                    </div>
                    <div className='score-details-container'>
                        <div className='score-details'>
                            <span>
                            {user.score}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ) : <></>
    }
}

const mapStateToProps = (state) => ({
    questions: state.questionsReducer.questions
})
  
  const mapDispatchToProps = (dispatch) => 
    bindActionCreators(
      {
      },
      dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(UserScoreComponent)
