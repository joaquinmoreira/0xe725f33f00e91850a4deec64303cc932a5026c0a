import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { getWeb3 } from "./services/web3";

import ErrorPage, { ERROR_TYPES } from "./components/pages/ErrorPage";
import Landing from "./components/pages/Landing";
import List from "./components/pages/List";
import File from "./components/pages/File";
import Upload from "./components/pages/Upload";
import theme from "./theme";

class App extends Component {
  state = {};

  async componentDidMount() {
    getWeb3();
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;

    return (
      <Fragment>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {!error ? (
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/upload" component={Upload} />
                <Route path="/list" component={List} />
                <Route path="/file/:hash/:address" component={File} />
                <Route
                  render={() => <ErrorPage type={ERROR_TYPES.NOT_FOUND} />}
                />
              </Switch>
            ) : (
              <ErrorPage type={ERROR_TYPES.GENERIC} />
            )}
          </ThemeProvider>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
