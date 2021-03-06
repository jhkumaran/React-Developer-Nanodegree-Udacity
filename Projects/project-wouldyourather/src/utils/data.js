let users = [
  {
    id: "sarah_edo",
    name: "Sarah Drasner",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    answeredQuestions: [],
    score: 1
  },
  {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    answeredQuestions: [],
    score: 1
  },
  {
    id: "dan_abramov",
    name: "Dan Abramov",
    avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
    answeredQuestions: [],
    score: 0
  }
]

let questions = [
  {
    id: "sfohnrkrc526od7nrm6w",
    createdUser: "tylermcginnis",
    optionOne: {
      text: "be a developer",
      answeredUsers:[]
    },
    optionTwo: {
      text: "be a tester",
      answeredUsers:[]
    },
    votes: 0,
    createdDate: new Date(),
  },
  {
    id: "k7zpbfbiouatift1wqxgtn",
    createdUser: "sarah_edo",
    optionOne: {
      text: "watch a comedy movie",
      answeredUsers:[]
    },
    optionTwo: {
      text: "watch a horror movie",
      answeredUsers:[]
    },
    votes: 0,
    createdDate: new Date(),
  }
]

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
      let user = users.find(t=> t.id === question.createdUser);
      user.score = user.score + 1;
      res({question, user});
    }, 100);
  })
}

export function _updateAnswer(questionId, selectedOption, userId){
  return new Promise((res, rej) => {
    setTimeout(() => {
      let questionIndex = questions.findIndex(t=> t.id === questionId);
      let question = questions[questionIndex];
      if(selectedOption === 0){
        question.optionOne.answeredUsers.push(userId);
      } else {
        question.optionTwo.answeredUsers.push(userId);
      }
      question.votes = question.votes + 1;
      questions[questionIndex] = question;
      let userIndex = users.findIndex(t=> t.id === userId);
      let user = users[userIndex];
      user.answeredQuestions.push(question.id);
      user.score = user.score + 1;
      users[userIndex] = user;
      res({ questions, users });
    }, 100);
  })
}