import React from "react";
import { Button } from "react-native";
import { Icon } from "react-native-elements";
import {
  createAppContainer,
  createStackNavigator,
  StackViewTransitionConfigs
} from "react-navigation";
import TaskList from "./components/TaskList";
import TaskView from "./components/TaskView";
import TaskForm from "./components/TaskForm";
import ScheduleForm from "./components/ScheduleForm";
import Store from "./store";

const Navigator = createStackNavigator({
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
    navigationOptions: ({ navigation: { state: { params } } }) => {
      return {
        headerTitle: params.task ? params.task.title : "New Task",
        headerLeft: (
          <Icon
            name="chevron-left"
            onPress={params.closeForm}
            iconStyle={{ marginLeft:10, fontSize:35 }}
          />
        ),
        headerRight: (
          <Button
            title="Save"
            onPress={params.saveTask}
            style={{marginRight:20}}
          />
        )
      };
    }
  },
  ScheduleForm: {
    screen: ScheduleForm,
    navigationOptions: ({ navigation: { state: { params } } }) => ({
      headerTitle: "Schedule",
      headerLeft: (
        <Icon
          name="close"
          onPress={params.closeForm}
          iconStyle={{ marginLeft:20, fontSize:25 }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          onPress={params.saveSchedule}
          iconStyle={{ marginRight:20, fontSize:25, color: "dodgerblue" }}
        />
      )
    })
  }
}, {
  gesturesEnabled: false,
  // snippet from react-navigation docs:
  transitionConfig: (transitionProps, prevTransitionProps) => {
    const { scene: { route: { routeName } } } = transitionProps;
    const isModal = (
      (routeName === "ScheduleForm") || (prevTransitionProps && (
        prevTransitionProps.scene.route.routeName === "ScheduleForm"
      ))
    );
    return StackViewTransitionConfigs.defaultTransitionConfig(
      transitionProps,
      prevTransitionProps,
      isModal
    );
  }
});

const getStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
  let params = action.params || {};
  if (action.routeName === "TaskForm") {
    const storeParams = {
      saveTask: params.task ? Store.updateTask : Store.createTask,
      closeForm: Store.discardTaskForm
    };
    params = Object.assign({}, params, storeParams);
  }
  if (action.routeName === "ScheduleForm") {
    const storeParams = {
      saveSchedule: Store.saveSchedule,
      closeForm: Store.discardScheduleForm
    };
    params = Object.assign({}, params, storeParams);
  }
  return getStateForAction(Object.assign({}, action, { params }), state);
};

export default createAppContainer(Navigator);
