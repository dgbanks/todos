import React from "react";
import { observer, inject } from "mobx-react";
import { CheckBox } from "react-native-elements";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store } = this.props;

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
            store.tasks.map(task => (
              <CheckBox title={task.title} />
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