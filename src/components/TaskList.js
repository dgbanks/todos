import React from "react";
import { observer, inject } from "mobx-react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationEvents as Listen } from "react-navigation";
import TaskItem from "./TaskItem";
import DateRangeTab from "./ui/DateRangeTab";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slidItem: false };
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  update(task) {
    this.props.dataStore.toggleComplete(task);
  }

  destroy(taskId) {
    const { dataStore, uiStore } = this.props;
    // this.setState({ slidItem: false });
    uiStore.deactivateItem();
    dataStore.deleteTask(taskId);
  }

  render() {
    const { dataStore, uiStore, navigation } = this.props;
    const { slidItem } = this.state;

    if (dataStore.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ height:"100%" }}>
        <Listen onWillBlur={
            () => uiStore.deactivateItem()
            // () => this.setState({ slidItem: false })
          } />
        <ScrollView style={{ height:"100%" }}>
          <DateRangeTab title="today" />
          {
            dataStore.tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                hasdetails={Boolean(task.content)}
                toggleComplete={() => this.update(task)}
                destroy={() => this.destroy(task.id)}
                navigate={location => navigation.navigate(location, { task })}
                pingList={() => this.setState({ slidItem: !slidItem })}
                slidItem={this.state.slidItem}
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
