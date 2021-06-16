import * as API from '../utils/api'
import * as constants from './constants';
import * as helper from '../utils/helper'

export const getAllQuestions = () => async dispatch => {
    const result = await API.getAllQuestions();
    console.log(result.questions);
    dispatch({
        type: constants.GET_ALL_QUESTIONS,
        questions : result.questions
    });
}

export const saveQuestion = (optionOne, optionTwo, createdUser) => async dispatch => {
    let question = helper.createQuestion(optionOne, optionTwo, createdUser);
    console.log(question);
    const result = await API.saveQuestion(question);
    console.log(result);
    dispatch({
        type: constants.SAVE_QUESTION,
        question: result.question
    });
    dispatch({
        type: constants.UPDATE_USER,
        user: result.user
    })
}

export const viewQuestion = (question) => dispatch => {
    dispatch({
        type: constants.VIEW_QUESTION,
        question
    })
}