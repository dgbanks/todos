import React from "react";
import { observer, inject } from "mobx-react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import moment from "moment";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slidItem: false };
    this.update = this.update.bind(this);
    this.manageItemStates = this.manageItemStates.bind(this);
  }

  update(task) {
    this.props.store.updateTask(task.id, {
      complete: task.complete ? 0 : 1,
      completedAt: !task.complete ? moment().valueOf() : null
    });
  }

  manageItemStates() {
    this.setState({ slidItem: !this.state.slidItem });
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
                hasdetails={Boolean(task.content)}
                toggleComplete={() => this.update(task)}
                destroy={() => {this.manageItemStates(); store.deleteTask(task.id);}}
                navigate={location => navigation.navigate(location, { task })}
                pingList={this.manageItemStates}
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
