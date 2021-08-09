
export const DECKLIST_STORAGE_KEY = '@DeckList'

export function formatDeckListResults (results) {
return results === null
    ? null
    : JSON.parse(results)
}

const getDummyData = () => {
    var DummyData = {
      "React": {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
            result : false,
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event',
            result : false,
          },
  
        ],
        score: 0
      },
      "JavaScript": {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.',
            result : false,
          },
          {
            question: 'Has Javascript version 25.000?',
            answer: 'Yes',
            result : false,
          },
        ],
        score: 0
      }
    }
    return DummyData;
  }