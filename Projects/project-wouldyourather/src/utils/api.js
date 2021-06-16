import { _getUsers, _getQuestions, _saveQuestion, _updateAnswer } from './data'

export function getAllUsers () {
    return Promise.all([
        _getUsers(),
    ]).then(([users]) => ({
        users
    }))
}

export function getAllQuestions(){
    return Promise.all([
        _getQuestions(),
    ]).then(([questions]) => ({
        questions
    }))
}

export function saveQuestion(question){
    return _saveQuestion(question);
}

export function updateAnswer(questionId, selectedOption, userId){
    return _updateAnswer(questionId, selectedOption, userId);
}