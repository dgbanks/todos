import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import uuid from "uuid";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.navigation.state.params) {
      const {
        id,
        title,
        content
      } = props.navigation.state.params.task;
      this.state = { id, title, content };
    } else {
      this.state = {
        id: uuid(),
        title: "",
        content: "",
        parentId: null,
        complete: 0,
        completedAt: null
      };
    }
    this.saveTask = this.saveTask.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.navigation.getParam("save", false)) {
      this.saveTask();
    }
  }

  saveTask() {
    const { params } = this.props.navigation.state;
    if (params && params.task) {
      this.props.store.updateTask(this.state.id, this.state);
      if (params.updateTask) {
        params.updateTask(this.state);
      }
    } else {
      this.props.store.createTask(this.state);
    }
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <ScrollView>
          <FormLabel>Title</FormLabel>
          <FormInput
            placeholder="Title"
            value={this.state.title}
            onChangeText={input => this.setState({ title: input })}
          />

          <FormLabel>Content</FormLabel>
          <FormInput
            multiline
            placeholder="Content"
            value={this.state.content}
            onChangeText={input => this.setState({ content: input })}
          />

        </ScrollView>
      </View>
    );
  }
}

export default inject("store")(observer(TaskForm));
