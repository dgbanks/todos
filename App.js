import React from 'react';
import { Provider } from "mobx-react";
import Router from "./src/router";
import Store from "./src/store";
import UIStore from "./src/uiStore";
import NavigationUtils from "./src/utils/navigationUtils";

export default class App extends React.Component {
  render() {
    return (
      <Provider {...{ store: Store, uiStore: UIStore }}>
        <Router ref={ref => NavigationUtils.setNavigator(ref)} />
      </Provider>
    );
  }
}
