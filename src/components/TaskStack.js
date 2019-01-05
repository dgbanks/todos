import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import TaskList from "./TaskList";
import TaskView from "./TaskView";
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
  TaskView: {
    screen: TaskView,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.task.title,
      headerLeft: (
        <Icon
          name="chevron-left"
          onPress={() => navigation.goBack()}
          iconStyle={{marginLeft:10, fontSize:35}}
        />
      ),
      headerRight: (
        <Icon
          name="edit"
          onPress={() => navigation.navigate("TaskForm", {
            task: navigation.state.params.task,
            updateTask: (updatedTask) => navigation.setParams({ task: updatedTask })
          })}
          iconStyle={{marginRight:10}}
        />
      )
    })
  },
  TaskForm: {
    screen: TaskForm,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params ? navigation.state.params.task.title : "New Task",
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
