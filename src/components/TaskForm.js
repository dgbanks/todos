import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView, Text } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import uuid from "uuid";

class TaskForm extends React.Component {
  state = {
    id: uuid(),
    title: "",
    content: "",
    parentId: null,
    complete: 0
  };

  render() {
    console.log(this.state);
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
        </ScrollView>
      </View>
    );
  }
}

export default inject("store")(observer(TaskForm));
