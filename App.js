import React from 'react';
import { Provider } from "mobx-react";
import Router from "./src/router";
import dataStore from "./src/stores/dataStore";
import uiStore from "./src/stores/uiStore";
import NavigationUtils from "./src/utils/navigationUtils";

export default class App extends React.Component {
  render() {
    return (
      <Provider {...{ dataStore, uiStore }}>
        <Router ref={ref => NavigationUtils.setNavigator(ref)} />
      </Provider>
    );
  }
}
