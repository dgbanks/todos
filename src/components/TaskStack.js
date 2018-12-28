import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import TaskList from "./TaskList";

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
  }
});

export default createAppContainer(Stack);
