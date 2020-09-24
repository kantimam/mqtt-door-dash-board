export const BASEURL = process.env.REACT_APP_BACK_END

export const login = (email, password) => {
    return fetch(`${BASEURL}/login`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
}