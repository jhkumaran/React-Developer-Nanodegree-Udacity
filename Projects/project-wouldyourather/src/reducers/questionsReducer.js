import * as actionConstants from '../actions/constants'

const initialState = {
    questions: []
}

export default function questions(state = initialState, action){
    switch(action.type){
        case actionConstants.GET_ALL_QUESTIONS:
            console.log(action.questions);
            return {
                ...state,
                questions: action.questions
            }
        default:
            return state;
    }
}