import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as questionActions from '../../actions/questionsAction';
import { withRouter } from 'react-router-dom'
import './question.css'

export class ViewQuestionComponent extends Component {
    state = {
        answered : this.props.answered
    }

    componentDidUpdate(prevProps){
        if(prevProps.answered !== this.props.answered){
            this.setState({
                answered: this.props.answered
            })
        }
    }

    viewSelectedQuestion = () => {
        this.props.history.push(`/question/${this.props.question.id}`);
    }

    render() {
        const {question} = this.props;
        let user = this.props.users.find(t=> t.id === question.createdUser);
        return (
            <div className='view-question-container'>
                <div className='view-question-header'>
                    <span>{`${user.name} asks:`} </span>
                </div>
                <div className='view-question-body'>
                    <img src={user.avatarURL} className='vq-user-img'
                        alt={`Avatar of ${user.name}`}/>
                    <div className='view-question-section'>
                        <div className='vq-would-you-rather'>
                            Would you rather
                        </div>
                        <div className='vq-option-text'>
                            {`...${question.optionOne.text}...`}
                        </div>
                        <button className='view-question-button'
                            onClick={this.viewSelectedQuestion}>
                            View Poll
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.userReducer.users,
    activeUser: state.userReducer.activeUser
});

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({
        ...questionActions
    },
    dispatch
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewQuestionComponent))
