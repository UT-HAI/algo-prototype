import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import theme from "./style/theme"
import { GlobalProvider } from "./state/context"
import Build from "./routes/Build"
import Admin from "./views/Admin/Admin"

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: 'column' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <GlobalProvider>
            <Switch>
              <Route path='/build'>
                <Build/>
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
            </Switch>
            </GlobalProvider>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
