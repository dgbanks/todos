import React from 'react';
import { Provider } from "mobx-react";
import Router from "./src/router";
import Store from "./src/store";
import { setNavigator } from "./src/utils/navigationUtils";

export default class App extends React.Component {
  render() {
    return (
      <Provider {...{ store: Store }}>
        <Router ref={ref => setNavigator(ref)} />
      </Provider>
    );
  }
}
// line 9 so that children can inject("store")
