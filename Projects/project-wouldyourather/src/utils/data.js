let users = [
  {
    id: "sarah_edo",
    name: "Sarah Drasner",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
  },
  {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
  },
  {
    id: "dan_abramov",
    name: "Dan Abramov",
    avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
  }
]

let questions = []

export function getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...users]), 1000)
  })
}

export function getQuestions(){
  return new Promise((res,rej) => {
    setTimeout(() => res([...questions]), 1000);
  })
}