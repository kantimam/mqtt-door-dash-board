import React, { useState, createContext, useReducer } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';


const initialState = {
  user: null
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
  const [user, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={[user, dispatch]}>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/" user={user}>
            <Home />
          </ProtectedRoute>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
