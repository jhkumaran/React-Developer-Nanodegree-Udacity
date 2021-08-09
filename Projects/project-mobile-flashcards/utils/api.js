import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDeckListResults, DECKLIST_STORAGE_KEY } from './_decks'

export function getDecksApi () {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then(formatDeckListResults)
}

export function addDeckApi(title){
  const newDeck = {
    title: title,
    questions: [],
    score : 0
  }
  return AsyncStorage.mergeItem(DECKLIST_STORAGE_KEY, JSON.stringify({
    [title]: newDeck,
  }))
}

export function clearDecksApi () {
  return AsyncStorage.clear();
}

export function addCardToDeckApi (title, card) {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].questions.push(card);
      AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveQuizScoreApi (title, score) { 
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].score = score
      AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(data))
    })
}

export function clearQuizScoreApi (title) {
  return AsyncStorage.getItem(DECKLIST_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].score = 0
      AsyncStorage.setItem(DECKLIST_STORAGE_KEY, JSON.stringify(data))
    })
}
