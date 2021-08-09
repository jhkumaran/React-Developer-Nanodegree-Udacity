import * as types from './types'

export function receiveDeckList (deckList) {
  return {
    type: types.RECEIVE_DECK_LIST,
    deckList,
  }
}

export function addDeck (title) {
  return {
    type: types.ADD_DECK,
    title,
  }
}

export function clearDeck(){
  return {
    type: types.CLEAR_DECK
  }
}

export function addCardToDeck (title, card) {
  return {
    type: types.ADD_CARD_TO_DECK,
    title,
    card,
  }
}

export function saveQuizScore (title, score) {
  return {
    type: types.SAVE_QUIZ_SCORE,
    title,
    score,
  }
}

export function clearQuizScore (title) {
  return {
    type: types.CLEAR_QUIZ_SCORE,
    title,
  }
}
  