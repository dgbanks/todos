import React from "react";
import { Button } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import TaskList from "./TaskList";

const Stack = createStackNavigator({
    TaskList: TaskList
});

export default createAppContainer(Stack);
