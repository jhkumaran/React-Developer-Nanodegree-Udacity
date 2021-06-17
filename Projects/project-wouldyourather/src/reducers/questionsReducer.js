import * as actionConstants from '../actions/constants'

const initialState = {
    questions: []
}

export default function questions(state = initialState, action){
    switch(action.type){
        case actionConstants.GET_ALL_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            };
        case actionConstants.SAVE_QUESTION:
            return addAndSortQuestions(state, action);
        default:
            return state;
    }
}

const addAndSortQuestions = (state, action) => {
    let questions = [...state.questions, action.question];
    questions = questions.sort((a, b) => 
                            b.createdDate !== undefined ?
                            new Date(b.createdDate) - new Date(a.createdDate) : 
                            -1);
    return {
        ...state,
        questions
    }
}