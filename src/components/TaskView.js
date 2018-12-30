import React from "react";
import { inject, observer } from "mobx-react";
import {
  View,
  ScrollView
} from "react-native";

class TaskView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}

export default inject("store")(observer(TaskView));
