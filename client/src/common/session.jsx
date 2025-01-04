const storeInSession = (key, value) => {
    return sessionStorage.setItem(key,value)
}

const lookInSession = (key, value) => {
    return sessionStorage.getItem(key,value)
}

const removeFromSession = (key, value) => {
    return sessionStorage.removeItem(key,value)
}

// const logOutUser = (key, value) => {
//     return sessionStorage.clear()
// }

export { storeInSession, lookInSession, removeFromSession }