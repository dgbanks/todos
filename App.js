import React from 'react';
import { Provider } from "mobx-react";
import TaskStack from "./src/components/TaskStack";
import Store from "./src/store";

export default class App extends React.Component {
  render() {
    return (
      <Provider {...{ store: Store }}>
        <TaskStack />
      </Provider>
    );
  }
}
// line 9 so that children can inject("store")
