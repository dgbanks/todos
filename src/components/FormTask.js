import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class FormTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { screenProps: { rootStack }, navigation } = this.props;
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("FormSchedule")}>
      <Text>Task Form</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    borderWidth:5
  }
});
