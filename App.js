import React from 'react';
import { Provider } from "mobx-react";
import Router from "./src/router";
import Store from "./src/store";
import NavigationUtils from "./src/utils/navigationUtils";

export default class App extends React.Component {
  render() {
    return (
      <Provider {...{ store: Store }}>
        <Router ref={ref => NavigationUtils.setNavigator(ref)} />
      </Provider>
    );
  }
}
