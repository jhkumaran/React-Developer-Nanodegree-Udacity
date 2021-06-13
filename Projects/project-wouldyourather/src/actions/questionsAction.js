import * as API from '../utils/api'
import * as constants from './constants';

export const getAllQuestions = () => async dispatch => {
    const result = await API.getAllQuestions();
    console.log(result.questions);
    dispatch({
        type: constants.GET_ALL_QUESTIONS,
        questions : result.questions
    });
}