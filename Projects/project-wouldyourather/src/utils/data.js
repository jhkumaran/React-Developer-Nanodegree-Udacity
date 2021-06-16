let users = [
  {
    id: "sarah_edo",
    name: "Sarah Drasner",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    answeredQuestions: [],
    score: 0
  },
  {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    answeredQuestions: [],
    score: 0
  },
  {
    id: "dan_abramov",
    name: "Dan Abramov",
    avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
    answeredQuestions: [],
    score: 0
  }
]

let questions = []

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...users]), 100)
  })
}

export function _getQuestions(){
  return new Promise((res,rej) => {
    setTimeout(() => res([...questions]), 100);
  })
}

export function _saveQuestion(question){
  return new Promise((res,rej) => {
    setTimeout(() => {
      questions = [...questions, question];
      console.log(questions);
      let user = users.find(t=> t.id === question.createdUser);
      user.score = user.score + 1;
      console.log(user);
      console.log(users);
      res({question, user});
    }, 100);
  })
}