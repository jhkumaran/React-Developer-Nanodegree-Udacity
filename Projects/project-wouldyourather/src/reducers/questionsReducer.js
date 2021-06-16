import * as actionConstants from '../actions/constants'

const initialState = {
    questions: [],
    question: undefined
}

export default function questions(state = initialState, action){
    switch(action.type){
        case actionConstants.GET_ALL_QUESTIONS:
            console.log(action.questions);
            return {
                ...state,
                questions: action.questions
            };
        case actionConstants.SAVE_QUESTION:
            console.log(action.question);
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