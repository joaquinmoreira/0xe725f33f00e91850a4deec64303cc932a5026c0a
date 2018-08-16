import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import Landing from "./components/pages/Landing";
import Upload from "./components/pages/Upload";
import theme from "./theme";

class App extends Component {
  state = { loggedIn: false };

  render() {
    const { loggedIn } = this.state;

    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Layout loggedIn={loggedIn}>
            <Route exact path="/" component={Landing} />
            <Route path="/upload" component={Upload} />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
