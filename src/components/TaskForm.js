import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView, DatePickerIOS, Text, StyleSheet } from "react-native";
import { FormLabel, FormInput, CheckBox, Button } from "react-native-elements";
import uuid from "uuid";
import moment from "moment";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.navigation.state.params) {
      const {
        id,
        title,
        content,
        dueDate
      } = props.navigation.state.params.task;
      this.state = { id, title, content, dueDate };
    } else {
      this.state = {
        id: uuid(),
        title: "",
        content: "",
        parentId: "",
        complete: 0,
        completedAt: null,
        dueDate: null
      };
    }
    this.error = null;
    this.saveTask = this.saveTask.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.navigation.getParam("save", false)) {
      this.saveTask();
    }
  }

  saveTask() {
    const { params } = this.props.navigation.state;
    if (this.state.title) {
      if (params && params.task) {
        this.props.store.updateTask(this.state.id, this.state);
        if (params.updateTask) {
          params.updateTask(this.state);
        }
      } else {
        this.props.store.createTask(this.state);
      }
      this.props.navigation.goBack();
    } else {
      this.error = true;
      this.titleField.focus();
    }
  }

  render() {
    const { dueDate } = this.state;
    const {
      dueDateContainer,
      dueDateText,
      checkboxContainer,
      checkboxLabel
    } = styles;

    return (
      <View>
        <ScrollView>
          <FormLabel>Title</FormLabel>
          <FormInput
            ref={node => this.titleField = node}
            placeholder="Title"
            value={this.state.title}
            onChangeText={input => this.setState({ title: input })}
            containerStyle={this.error && { borderBottomColor:"dodgerblue" }}
          />

          <FormLabel>Content</FormLabel>
          <FormInput
            multiline
            placeholder="Content"
            value={this.state.content}
            onChangeText={input => this.setState({ content: input })}
          />

          <View style={dueDateContainer}>
            <CheckBox
              title={<FormLabel labelStyle={checkboxLabel}>Due Date</FormLabel>}
              containerStyle={checkboxContainer}
              checked={Boolean(this.state.dueDate)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="dodgerblue"
              onPress={() => this.setState({ dueDate: dueDate ? null : new Date().valueOf() })}
            />
          <Text style={dueDateText}>
            {Boolean(dueDate) && moment(dueDate).format("MMMM Do, YYYY")}
          </Text>
        </View>
        {
          dueDate && (
            <DatePickerIOS
              mode="date"
              date={new Date(this.state.dueDate)}
              minimumDate={new Date()}
              onDateChange={d => this.setState({ dueDate: d.valueOf() })}
              />
          )
        }
        </ScrollView>
      </View>
    );
  }
}

export default inject("store")(observer(TaskForm));

const styles = StyleSheet.create({
  dueDateContainer: {
    position:"relative",
    justifyContent:"center"
  },
  dueDateText: {
    position:"absolute",
    right:50,
    color:"dodgerblue",
    fontWeight:"500"
  },
  checkboxContainer: {
    backgroundColor:"transparent",
    borderWidth:0
  },
  checkboxLabel: {
    marginTop:0
  }
});
