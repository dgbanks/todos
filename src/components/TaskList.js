import React from "react";
import { observer, inject } from "mobx-react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationEvents as Listen } from "react-navigation";
import TaskItem from "./TaskItem";
import moment from "moment";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slidItem: false };
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  update(task) {
    this.props.store.updateTask(task.id, {
      complete: task.complete ? 0 : 1,
      completedAt: !task.complete ? moment().valueOf() : null
    });
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
      <View>
        <Listen onWillBlur={() => this.setState({ slidItem: false })} />
        <ScrollView>
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
