import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";

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
        <Text>hello there</Text>

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
