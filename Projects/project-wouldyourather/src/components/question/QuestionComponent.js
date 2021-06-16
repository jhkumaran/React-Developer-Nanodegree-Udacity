import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as questionActions from '../../actions/questionsAction';

export class QuestionComponent extends Component {
    render() {
        let user = this.props.users.find(t=> t.id === this.props.activeUser);
        console.log(user);
        console.log(this.props.question);
        let answered = user.answeredQuestions.find(t=> t === this.props.question.id) !== undefined;
        console.log(answered);
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.userReducer.users,
    activeUser: state.userReducer.activeUser,
    question: state.questionsReducer.question
});

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({
        ...questionActions
    },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent)
