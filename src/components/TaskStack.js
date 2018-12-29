import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const Stack = createStackNavigator({
  TaskList: {
    screen: TaskList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Tasks",
      headerRight: (
        <Icon
          name="add"
          onPress={() => navigation.navigate("TaskForm")}
          iconStyle={{ marginRight:20, fontWeight:"bold" }}
        />
      )
    })
  },
  TaskForm: {
    screen: TaskForm,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "New Task",
      headerLeft: (
        <Icon
          name="chevron-left"
          onPress={() => navigation.goBack()}
          iconStyle={{marginLeft:10, fontSize:35}}
        />
      )
    })
  }
});

export default createAppContainer(Stack);
