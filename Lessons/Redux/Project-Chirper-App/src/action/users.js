export const RECEVIE_USERS='RECEVIE_USERS'

export function receiveUsers(users){
    return {
        type: RECEVIE_USERS,
        users
    }
}