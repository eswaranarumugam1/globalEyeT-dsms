import { createGlobalStyle, useTheme } from 'styled-components'
// import { useTheme } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: Poppins, sans-serif !important;

  }

  hr{
    border: ${({ theme }) => theme.border}!important;
    width: 200px;
  }


  .register-button {
      background-color : ${({ theme }) => theme.backgroundColor}!important;
      margin: 10px !important;
      padding: 10px 35px 10px 35px !important;
      border-radius: 25px !important;
      color: white;
      font-size: medium;
      border-width: 0px;
  }

  .input-tra {
    background-color : transparent !important;
    border-width : 0px !important;
  }

  .bordered-input {
    border-width : 1px !important;
    border: ${({ theme }) => theme.border}!important;
    display: flex;
    flex-direction: row;
    border-radius: 25px !important;
  }

  .theme-color {
    background-color : ${({ theme }) => theme.backgroundColor}!important

  }

  .primary-color {
    border-color : ${({ theme }) => theme.backgroundColor}!important;

    }

    .div {
      font-family : Chilanka !important;

    }

    .round-border {
      border: ${({ theme }) => theme.border}!important;
      border-radius: 50% !important;
    }
    
  
    .row {
      margin-left: 0px !important;
      margin-right: 0px !important;
    
    }

  `