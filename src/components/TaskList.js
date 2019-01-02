import React from "react";
import { observer, inject } from "mobx-react";
import { CheckBox } from "react-native-elements";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import TaskItem from "./TaskItem";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
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
                update={() => store.updateTask(task.id, { complete: task.complete ? 0 : 1 })}
                destroy={() => store.deleteTask(task.id)}
                navigate={location => navigation.navigate(location, { task })}
              />
              // <CheckBox
              //   title={task.title}
              //   checked={task.complete}
              //   onIconPress={() => store.updateTask(task.id, { complete: task.complete ? 0 : 1 })}
              //   onPress={() => navigation.navigate("TaskView", { task })}
              //   onLongPress={() => store.deleteTask(task.id)}
              // />
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
