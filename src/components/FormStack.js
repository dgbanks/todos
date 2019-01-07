import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { View, Button } from "react-native";
import { Icon } from "react-native-elements";
import FormTask from "./FormTask";
import FormSchedule from "./FormSchedule";

const Stack = createAppContainer(createStackNavigator({
  FormTask: {
    screen: FormTask,
    navigationOptions: ({ navigation, screenProps: { rootStack } }) => ({
      header:null
    })
  },
  FormSchedule: {
    screen: FormSchedule,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Schedule",
      headerLeft: (
        <Icon
        name="close"
        onPress={() => navigation.goBack()}
        iconStyle={{marginLeft:10, fontSize:25}}
        />
      ),
      headerRight: (
        <Button
          title="Save"
        />
      )
    })
  }
}, {
  mode: "modal"
}));

export default class FormStack extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    // debugger;
  }

  render() {
    const { navigation } = this.props;
    return (
      <Stack screenProps={{ rootStack: navigation }} />
    );
  }
}
