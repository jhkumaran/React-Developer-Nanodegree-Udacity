import * as actionConstants from '../actions/constants'

const initialState = {
    questions: [],
    question: undefined
}

export default function questions(state = initialState, action){
    switch(action.type){
        case actionConstants.GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            };
        case actionConstants.SAVE_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.question]
            };
        case actionConstants.VIEW_QUESTION:
            return {
                ...state,
                question: action.question
            }
        default:
            return state;
    }
}