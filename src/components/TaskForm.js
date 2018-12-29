import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView, Text, Button as RNButton } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import uuid from "uuid";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      title: "",
      content: "",
      parentId: null,
      complete: 0
    };
    this.createTask = this.createTask.bind(this);
  }

  createTask() {
    this.props.store.createTask(this.state);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <ScrollView>
          <FormLabel>Title</FormLabel>
          <FormInput
            placeholder="Title"
            onChangeText={input => this.setState({ title: input })}
          />

          <FormLabel>Content</FormLabel>
          <FormInput
            multiline
            placeholder="Content"
            onChangeText={input => this.setState({ content: input })}
          />

          <Button
            title="Testing"
            color="#4a4a4a"
            onPress={this.createTask}
            disabled={!this.state.title}
          />

        </ScrollView>
      </View>
    );
  }
}

export default inject("store")(observer(TaskForm));
