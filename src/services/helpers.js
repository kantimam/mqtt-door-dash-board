export function handleError(response) {
    if (!response.ok) throw new Error(response.statusText)
    return response
}

export const localStorageUserKey = () => `${process.env.REACT_APP_LOCAL_STORAGE || "LOCK_APP"}_user`
