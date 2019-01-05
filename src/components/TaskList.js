import React from "react";
import { observer, inject } from "mobx-react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import moment from "moment";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(task) {
    this.props.store.updateTask(task.id, {
      complete: task.complete ? 0 : 1,
      completedAt: task.complete ? moment().valueOf() : null
    });
  }

  render() {
    const { store, navigation } = this.props;
    if (store.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View>
        <ScrollView>
          {
            store.tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                details={false}
                update={() => this.update(task)}
                destroy={() => store.deleteTask(task.id)}
                navigate={location => navigation.navigate(location, { task })}
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
