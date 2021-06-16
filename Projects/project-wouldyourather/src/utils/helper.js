export const generateUID  = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const createQuestion = (optionOne, optionTwo, createdUser) => {
    let id = generateUID();
    let newQuestion = {
        id,
        createdUser,
        optionOne: {
            text: optionOne,
            answeredUsers: []
        },
        optionTwo: {
            text: optionTwo,
            answeredUsers: []
        },
        votes: 0
    }
    return newQuestion
}