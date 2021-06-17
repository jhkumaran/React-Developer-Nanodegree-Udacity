import React, { Component } from 'react'
import './newQuestion.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as questionsAction from '../../actions/questionsAction'
import { withRouter } from 'react-router-dom'

export class NewQuestionComponent extends Component {

    state={
        optionOne: '',
        optionTwo: ''
    }

    handeChangeOptionOne = (e) => {
        this.setState({ optionOne : e.target.value });
    }

    handleChangeOptionTwo = (e) => {
        this.setState({ optionTwo : e.target.value });
    }

    submitQuestion = (e) => {
        e.preventDefault();
        this.props.saveQuestion(this.state.optionOne, this.state.optionTwo, this.props.activeUser);
        this.props.history.push('/home');
    }

    render() {
        const {optionOne, optionTwo} = this.state;
        return (
            <div className='nq-container'>
                <div className='nq-header'>
                    <div className='nq-welcome-message'>
                        Create New Question
                    </div>
                </div>
                <div className='nq-body'>
                    <span>
                        Complete the Question
                    </span>
                    <div style={{marginTop: '25px'}}>
                        <div className='would-you-rather-text'>
                            Would You Rather ...
                        </div>
                        <input placeholder='Enter Option One Text Here'
                            value={optionOne}
                            onChange={(e) => this.handeChangeOptionOne(e)}
                            className='input-options'/>
                        <div className='would-you-rather-text center'>
                            OR
                        </div>
                        <input placeholder='Enter Option Two Text Here'
                            value={optionTwo}
                            onChange={(e) => this.handleChangeOptionTwo(e)}
                            className='input-options'/>
                        <button className={`nq-submit-button ${optionOne === '' || optionTwo === '' ? 'disabled' :''}`}
                            onClick={(e) => this.submitQuestion(e)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    activeUser: state.userReducer.activeUser
})
  
  const mapDispatchToProps = (dispatch) => 
    bindActionCreators(
      {
          ...questionsAction
      },
      dispatch
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewQuestionComponent))
