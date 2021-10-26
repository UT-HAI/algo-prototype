import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import theme from "./style/theme"
import { GlobalProvider } from "./state/context"
import Steps from "./routes/Steps"
import Admin from "./views/Admin/Admin"
import Error from "./components/Error"

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: 'column' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <GlobalProvider>
              <Error />
              <Switch>
                <Route path='/steps'>
                  <Steps/>
                </Route>
                <Route path='/admin'>
                  <Admin />
                </Route>
                <Redirect to='/steps' />
              </Switch>
            </GlobalProvider>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
