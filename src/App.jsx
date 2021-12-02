import React from "react"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import theme from "./style/theme"
import { GlobalProvider } from "./state/context"
import Steps from "./routes/Steps"
import Admin from "./views/Admin/Admin"
import Home from "./views/Home/Home"
import Error from "./components/Error"

function App() {
  return (
    <div className="App" style={{ height: "100vh", display: "flex", flexDirection: 'column' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <GlobalProvider>
              <Error />
              <Switch>
                <Route exact path='/'>
                  <Home/>
                </Route>
                <Route path='/steps'>
                  <Steps/>
                </Route>
                <Route path='/admin'>
                  <Admin />
                </Route>
                <Redirect to='/' />
              </Switch>
            </GlobalProvider>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
