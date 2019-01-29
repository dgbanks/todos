import React from "react";
import { observer, inject } from "mobx-react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import TaskItem from "./TaskItem";
import DateRangeTab from "./ui/DateRangeTab";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy(taskId) {
    this.props.uiStore.deactivateItem();
    this.props.dataStore.deleteTask(taskId);
  }

  render() {
    const { dataStore, uiStore, navigation: { navigate } } = this.props;

    if (dataStore.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ height:"100%" }}>
        <NavigationEvents onWillBlur={uiStore.deactivateItem} />
        <ScrollView style={{ height:"100%" }}>
          <DateRangeTab title="today" />
          {
            dataStore.tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                hasdetails={Boolean(task.content)}
                toggleComplete={() => dataStore.toggleComplete(task)}
                destroy={() => this.destroy(task.id)}
                navigate={location => navigate(location, { task })}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

export default inject("dataStore", "uiStore")(observer(TaskList));

const styles = StyleSheet.create({
  loading: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
