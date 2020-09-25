import { handleError } from './helpers'
export const BASEURL = process.env.REACT_APP_BACK_END



export function login(username, password) {
    return fetch(`${BASEURL}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(handleError)
}


export function signUp(username, password) {
    return fetch(`${BASEURL}/signup`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(handleError)
}

export function logOut() {
    return fetch(`${BASEURL}/logout`, {
        credentials: 'include'
    })
}



export function getUser() {
    return fetch(`${BASEURL}/user`, {
        credentials: 'include'
    }).then(handleError);
}
