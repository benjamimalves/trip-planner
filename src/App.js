import React from 'react';
import { createGlobalStyle } from 'styled-components';

// Global Containers
import Main from './containers/Main';

// Import CSS reset and Global Styles
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <>
      <Main />
      <GlobalStyle />
    </>
  );
}

export default App;
