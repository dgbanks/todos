import React from "react";
import { createAppContainer, createStackNavigator, withNavigation } from "react-navigation";
import { View, Button } from "react-native";
import { Icon } from "react-native-elements";
import FormTask from "./FormTask";
import FormSchedule from "./FormSchedule";

export default createStackNavigator({
  FormTask: {
    screen: FormTask,
    navigationOptions: (props) => {
      debugger
      return ({
      header:null
    })}
  },
  FormSchedule: {
    screen: FormSchedule,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Schedule",
      headerLeft: (
        <Icon
        name="close"
        onPress={() => navigation.goBack()}
        iconStyle={{marginLeft:20, fontSize:25}}
        />
      ),
      headerRight: (
        <Button
          title="Done"
          onPress={() => navigation.goBack()}
        />
      )
    })
  }
}, {
  mode: "modal",
  cardOverlayEnabled:true,
  gesturesEnabled: false
});

// export default FormStack = ({ navigation }) => (
//   <Stack screenProps={{ rootStack: navigation }} />
// );
