import React from "react";
import { inject, observer } from "mobx-react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

class TaskView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { task } = this.props.navigation.state.params;
    return (
      <View>
        {
          Boolean(task.content) && (
            <View style={styles.attribute}>
              <Text style={styles.attrName}>Content</Text>
              <Text>{task.content}</Text>
            </View>
          )
        }

        {
          Boolean(task.dueDate) && (
            <View style={styles.attribute}>
              <Text style={styles.attrName}>Due Date</Text>
              <Text>{task.dueDate}</Text>
            </View>
          )
        }
      </View>
    );
  }
}

export default inject("dataStore", "uiStore")(observer(TaskView));

const styles = StyleSheet.create({
  attribute: {
    padding:20
  },
  attrName: {
    fontWeight:"bold",
    fontSize:16
  }
});
