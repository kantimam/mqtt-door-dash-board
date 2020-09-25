import React, { createContext, useReducer, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

const initialState = {
  user: null
}

// check if localStorage has some state otherwise apply default state
const persistentState = (storageKey, defaultState) => {
  const data = localStorage.getItem(storageKey);
  if (data) return JSON.parse(data); // if there id data hydrate the default state with it
  return defaultState // otherwise return the normal default state
}

export const UserContext = createContext(initialState)

export const reducer = (state, action) => {
  switch (action.type) {
    case 'logIn':
      return { ...state, user: action.payload }
    case 'logOut':
      return { ...state, user: null }

    default:
      throw new Error('Not among actions')
  }
}

function App() {
  const [userState, dispatch] = useReducer(
    reducer,
    persistentState(`${process.env.REACT_APP_LOCAL_STORAGE || "LOCK_APP"}_user`, initialState)
  )

  useEffect(() => {
    const persist = () => {
      const storageKey = `${process.env.REACT_APP_LOCAL_STORAGE || "LOCK_APP"}_user`
      localStorage.setItem(`${storageKey}_user`, JSON.stringify(userState))
    }
    window.addEventListener("beforeunload", persist)
    return () => {
      window.removeEventListener("beforeunload", persist)
    }
  }, [userState])

  useEffect(() => {
    console.log("i should get fresh user data on app start :)")

  }, [])
  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      <div className="App">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <ProtectedRoute
            path="/"
            user={userState.user}
            component={Home}
          />
        </Switch>

      </div>
    </UserContext.Provider>
  );
}

export default App;
