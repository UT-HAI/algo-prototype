import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./components/MainLayout"
import theme from "./style/theme"
import SelectFeatures from "./views/SelectFeatures/SelectFeatures";
import { GlobalProvider } from "./state/context"

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: 'column' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <GlobalProvider>
            <Switch>
              <Route path='/build'>
                <MainLayout>
                  <Switch>
                    {/* would put steps 1-4 in here */}
                    <Route exact path='/build/2'>
                      <SelectFeatures />
                    </Route>
                  </Switch>
                </MainLayout>
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
