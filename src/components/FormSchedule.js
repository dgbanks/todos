import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";

export default class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, screenProps: { rootStack } } = this.props;
    return (
      <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => rootStack.setParams({ noHeader: true })}
        onWillBlur={() => rootStack.setParams({ noHeader: false })}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Schedule Form</Text>
      </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center"
  }
});
