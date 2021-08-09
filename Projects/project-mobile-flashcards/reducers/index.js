import * as types from '../actions/types'

export default function entries(state = {} , action){
    switch (action.type) {
        case types.RECEIVE_DECK_LIST:
            return {
                ...state,
                ...action.deckList,
            };
        case types.ADD_DECK:
            return {
                ...state,
                [action.title]: {
                  title: action.title,
                  questions: [],
                  score : 0
                }
            };
        case types.CLEAR_DECK :
            return state = {};
        case types.ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat(action.card)
                }
            };
        case types.SAVE_QUIZ_SCORE:
            return {
                ...state,
                [action.title]: {
                  ...state[action.title],
                  score: action.score
                }
            };
        case types.CLEAR_QUIZ_SCORE:
            return {
                ...state,
                [action.title]: {
                  ...state[action.title],
                  score:0
                }
            };
        default:
            return state;
    }
}