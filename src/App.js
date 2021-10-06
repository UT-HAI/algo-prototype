import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./components/MainLayout"
import theme from "./style/theme"
import SelectFeatures from "./views/SelectFeatures";

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Switch>
              <Route path='/build'>
                <MainLayout>
                  <Switch>
                    {/* would put steps 1-4 in here */}
                    <Route exact path='/2'>
                      <SelectFeatures />
                      <div />
                    </Route>
                  </Switch>
                </MainLayout>
              </Route>
            </Switch>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
