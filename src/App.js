import React from 'react';
import { Router } from '@reach/router';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { StateProvider } from './providers/StateProvider';
import { reducer, state } from './providers/state';

function App() {
  return (
    <StateProvider reducer={reducer} initialState={{ ...state }}>
      <Router>
        <Home path="/" />
        <SignIn path="/signin" />
        <SignUp path="/signup" />
      </Router>
    </StateProvider>
  );
}

export default App;
