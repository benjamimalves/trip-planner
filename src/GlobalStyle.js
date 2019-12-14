import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Open Sans', Arial, sans-serif;
  }

  #app {
    height: 100%; 
    min-height: 100%;
    min-width: 100%;
  }

  p, ul {
    margin: 0;
    padding: 0;
  }

  li {
      list-style-type: none;
    }
`;

export default GlobalStyle;
