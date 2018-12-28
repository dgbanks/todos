import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { observer, inject } from "mobx-react";
import Store from "./src/store";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks } = this.props.store;
    if (tasks) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>something</Text>
          {
            tasks.map((t,i) => (
              <Text key={i}>{t.title}</Text>
            ))
          }
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

export default inject(() => ({ store: Store }))(observer(App));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
