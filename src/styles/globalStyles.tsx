import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    line-height: 1.6;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease-in-out;
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(1px);
    }
  }

  input {
    font-family: inherit;
  }

  h1, h2, h3 {
    font-weight: 600;
    line-height: 1.2;
  }
`;

export default GlobalStyle;
