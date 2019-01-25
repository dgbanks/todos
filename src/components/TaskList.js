import React from "react";
import { observer, inject } from "mobx-react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationEvents as Listen } from "react-navigation";
import TaskItem from "./TaskItem";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slidItem: false };
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.navigation.state.params.hide) {
      this.props.store.filter = true;
    } else {
      this.props.store.filter = false;
    }
  }

  update(task) {
    this.props.store.toggleComplete(task);
  }

  destroy(taskId) {
    this.setState({ slidItem: false });
    this.props.store.deleteTask(taskId);
  }

  render() {
    const { store, navigation } = this.props;
    const { slidItem } = this.state;

    if (store.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ height:"100%" }}>
        <Listen onWillBlur={() => this.setState({ slidItem: false })} />
        <ScrollView style={{ height:"100%" }}>
          {
            store.tasks.map((task, index) => (
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

export default inject("store")(observer(TaskList));

const styles = StyleSheet.create({
  loading: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
