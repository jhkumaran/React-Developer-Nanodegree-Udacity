import { getUsers, getQuestions } from './data'

export function getAllUsers () {
    return Promise.all([
        getUsers(),
    ]).then(([users]) => ({
        users
    }))
}

export function getAllQuestions(){
    return Promise.all([
        getQuestions(),
    ]).then(([questions]) => ({
        questions
    }))
}