import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { CheckBox } from "react-native-elements";
import { observer, inject } from "mobx-react";
import TaskStack from "./src/components/TaskStack";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Store from "./src/store";

// class HomeComponent extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <ScrollView>
//           {
//             ["hi", "hello", "hola"].map(greeting => (
//               <CheckBox title={greeting} />
//             ))
//           }
//         </ScrollView>
//       </View>
//     );
//   }
// }
// class OtherComponent extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Other Screen</Text>
//       </View>
//     );
//   }
// }
//
// const Stack = createAppContainer(createStackNavigator({
//   Home: HomeComponent,
//   Other: OtherComponent
// }));


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks } = this.props.store;
    if (tasks) {
      return (
        <TaskStack />
      );
      // return (
      //   <View style={styles.container}>
      //     <Text>hello hello hi holaaa</Text>
      //   </View>
      // );
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
