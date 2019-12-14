import React, { useReducer } from 'react';

// Context API
import AppContext from './reducer/context';

// Reducer
import reducer from './reducer/reducer';

// Global Containers
import Main from './containers/Main';

// Import CSS reset and Global Styles
import GlobalStyle from './GlobalStyle';

function App() {
  const initialState = {
    departure: {},
    destination: {},
    planner: false
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Main />
      <GlobalStyle />
    </AppContext.Provider>
  );
}

export default App;
