import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as questionActions from '../../actions/questionsAction';

export class QuestionComponent extends Component {
    state = {
        selectedOption: -1,
        user: undefined,
        createdUser: undefined,
        question: undefined,
        answered: false,
    }

    componentDidMount(){
        const { questions } = this.props;
        const { question_id } = this.props.match.params;
        let question = questions.find(t=> t.id === question_id);
        let user = this.props.users.find(t=> t.id === this.props.activeUser);
        let createdUser = this.props.users.find(t=> t.id === question.createdUser);
        let answered = user.answeredQuestions.find(t=> t === question.id) !== undefined;
        this.setState({
            user, createdUser, question, answered
        })
    }

    optionSelected = (option) => {
        this.setState({ selectedOption: option });
    }

    submitAnswer = async() => {
        await this.props.updateAnswer(this.state.question.id, this.state.selectedOption, this.state.user.id);
        this.setState({ answered : true });
    }

    viewUnaswered = () => {
        const { question } = this.state;
        return (
            <div className='view-question-section'>
                <div className='vq-would-you-rather'>
                    Would You Rather..
                </div>
                <div className='view-question-options'>
                    <div className='view-question-option' onClick={() => this.optionSelected(0)}>
                        <input type='radio' name='optionOne'
                            value='optionOne'
                            checked={this.state.selectedOption === 0} 
                            onChange={() => this.optionSelected(0)} />
                        <span>{question.optionOne.text}</span>
                    </div>
                    <div className='view-question-option' onClick={() => this.optionSelected(1)}>
                        <input type='radio' name='optionTwo'
                            value='ooptionTwoptionOne'
                            checked={this.state.selectedOption === 1} 
                            onChange={() => this.optionSelected(1)} />
                        <span>{question.optionTwo.text}</span>
                    </div>
                </div>
                <button className={`question-submit-button ${this.state.selectedOption === -1 ? 'disabled' : ''}`}
                    onClick={this.submitAnswer}>
                    Submit
                </button>
            </div>
        )
    }

    getResultBar = (option) => {
        const { question } = this.state;
        let votedFor = option === 0 ? question.optionOne.answeredUsers.length : question.optionTwo.answeredUsers.length;
        let votedPercentage = Math.round((votedFor / question.votes) * 100);
        let styleText = votedPercentage >= 50 
                        ? `linear-gradient(to right, green ${votedPercentage}%, white ${100-votedPercentage}%)` 
                        : `linear-gradient(to left, white ${100-votedPercentage}%, green ${votedPercentage}%)`
        return (
            <div className='result-bar' style={{background: `${styleText}`}}/>
        )
    }

    getResultBarOption2 = () => {
        const { question } = this.state;
        let votedFor = question.optionTwo.answeredUsers.length;
        let votedPercentage = Math.round((votedFor / question.votes) * 100);
        let styleText = votedPercentage >= 50 
                        ? `linear-gradient(to right, green ${votedPercentage}%, white ${100-votedPercentage}%)` 
                        : `linear-gradient(to left, white ${100-votedPercentage}%, green ${votedPercentage}%)`
        return (
            <div className='result-bar' style={{background: `${styleText}`}}/>
        )
    }

    viewAnswered = () => {
        const { question, user } = this.state;
        let isOptionOneSelected = question.optionOne.answeredUsers.find(t=> t === user.id) !== undefined;
        return (
            <div className='view-question-section'>
                <div className='vq-would-you-rather'>
                    Results:
                </div>
                <div className='view-question-options'>
                    <div>
                        <span className={`your-choice ${isOptionOneSelected ? 'show': ''}`}>
                            Your Choice
                        </span>
                    </div>
                    <div className={`view-question-resultOption ${isOptionOneSelected ? 'selected' : ''}`}>
                        
                        <span>
                            {`Would you rather ${question.optionOne.text}?`}
                        </span>
                        {this.getResultBar(0)}
                        <span>
                            {`${question.optionOne.answeredUsers.length} out of ${question.votes} votes`}
                        </span>
                    </div>
                    <div>
                        <span className={`your-choice ${!isOptionOneSelected ? 'show': ''}`}>
                            Your Choice
                        </span>
                    </div>
                    <div className={`view-question-resultOption ${!isOptionOneSelected ? 'selected' : ''}`}>
                        <span>
                            {`Would you rather ${question.optionTwo.text}?`}
                        </span>
                        {this.getResultBar(1)}
                        <span>
                            {`${question.optionTwo.answeredUsers.length} out of ${question.votes} votes`}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { user, createdUser, question, answered } = this.state;
        return user === undefined || question === undefined || createdUser === undefined ? <></> : (
            <div style={{width: '600px', margin:'0px auto'}}>
                <div className='view-question-container'>
                    <div className='view-question-header'>
                        { 
                            answered ? 
                            <span>{`Asked by ${createdUser.name}`}</span> : 
                            <span>{`${createdUser.name} asks:`} </span>
                        }
                    </div>
                    <div className='view-question-body'>
                        <img src={createdUser.avatarURL} className='vq-user-img'
                            alt={`Avatar of ${createdUser.name}`}/>
                        { answered ? this.viewAnswered() : this.viewUnaswered()}
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.userReducer.users,
    activeUser: state.userReducer.activeUser,
    questions: state.questionsReducer.questions
});

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({
        ...questionActions
    },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent)
