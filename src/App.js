// // ** Router Import
// import { AppContextProvider,AppConsumer } from './AppContextProvider'

// const color = 'blue'
// const App = props => 

// <Router color={color}/>

// export default App

import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components' 
import { lightTheme, darkTheme } from './Themes' 
import { GlobalStyles } from './global' 
import Router from './router/Router'
import Button from 'reactstrap/lib/Button'
import WebFont from 'webfontloader'
import './app.css'
// The function that toggles between themes
function App() {
  const [theme, setTheme] = useState('red') 
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark') 
    } else {
      setTheme('light') 
    }
  }
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    })
   }, [])
  // Return the layout based on the current theme
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        {/* <div > Pass the toggle functionality to the button</div>
        <button onClick={toggleTheme}>Change Color</button> */}
        {/* <Container> */}
        <Router color={theme}/>
        {/* </Container> */}
    </ThemeProvider>
  ) 
}

export default App 

const Container = styled.div`
  width: 100%;
  border: ${props => `1px solid ${props.theme.colors.red}`};
  background-color: ${props => props.theme.colors.red};
  font-family: ${props => props.theme.fonts[0]};
`