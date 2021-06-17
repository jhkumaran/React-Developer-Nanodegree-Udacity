import * as API from '../utils/api'
import * as constants from './constants';
import * as helper from '../utils/helper'

export const getAllQuestions = () => async dispatch => {
    const result = await API.getAllQuestions();
    let questions = result.questions.sort((a, b) => 
                        b.createdDate !== undefined ?
                        new Date(b.createdDate) - new Date(a.createdDate) : 
                        -1);
    dispatch({
        type: constants.GET_ALL_QUESTIONS,
        questions : questions
    });
}

export const saveQuestion = (optionOne, optionTwo, createdUser) => async dispatch => {
    let question = helper.createQuestion(optionOne, optionTwo, createdUser);
    const result = await API.saveQuestion(question);
    dispatch({
        type: constants.SAVE_QUESTION,
        question: result.question
    });
    dispatch({
        type: constants.UPDATE_USER,
        user: result.user
    })
}

export const updateAnswer = (questionId, selectedOption, userId) => async dispatch => {
    let result = await API.updateAnswer(questionId, selectedOption, userId);
    dispatch({
        type: constants.GET_ALL_QUESTIONS,
        questions: result.questions
    })
    dispatch({
        type: constants.GET_USERS,
        users: result.users
    })
}