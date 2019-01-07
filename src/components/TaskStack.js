import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Button } from "react-native";
import { Icon } from "react-native-elements";
import TaskList from "./TaskList";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";

const Stack = createStackNavigator({
  TaskList: {
    screen: TaskList,
    navigationOptions: ({ navigation }) => {
      const { getParam, setParams, navigate } = navigation;
      return {
        headerTitle: "Tasks",
        headerLeft: (
          <Icon
            name="filter-list"
            onPress={() => setParams({ hide: !getParam("hide", false) })}
            iconStyle={{ marginLeft:20, fontWeight:"bold" }}
            color={getParam("hide", false) ? "dodgerblue" : "#a4a4a4"}
          />
        ),
        headerRight: (
          <Icon
            name="add"
            onPress={() => navigate("TaskForm")}
            iconStyle={{ marginRight:20, fontWeight:"bold" }}
          />
        )
      };
    }
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
            updateTask: task => navigation.setParams({ task: task })
          })}
          iconStyle={{marginRight:10}}
        />
      )
    })
  },
  TaskForm: {
    screen: TaskForm,
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      return {
        headerTitle: (params && params.task) ? params.task.title : "New Task",
        headerLeft: (
          <Icon
            name="chevron-left"
            onPress={() => navigation.goBack()}
            iconStyle={{marginLeft:10, fontSize:35}}
          />
        ),
        headerRight: (
          <Button
            title="Save"
            onPress={() => navigation.setParams({ save: true })}
            style={{marginRight:20}}
          />
        )
      };
    }
  }
});

export default createAppContainer(Stack);
