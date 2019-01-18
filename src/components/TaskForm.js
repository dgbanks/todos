import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView, DatePickerIOS, Text, StyleSheet } from "react-native";
import { FormLabel, FormInput, CheckBox, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { displayDate } from "../utils/timeUtils";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDueDate = this.handleDueDate.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.openScheduleForm = this.openScheduleForm.bind(this);
  }

  handleDueDate() {
    const { task } = this.props.store;
    if (task.dueDate) {
      task.dueDate = null;
    } else {
      task.dueDate = new Date().valueOf();
      task.schedule = null;
    }
  }

  handleSchedule() {
    const { task } = this.props.store;
    if (task.schedule) {
      task.schedule = null;
    } else {
      task.schedule = {};
      task.dueDate = null;
      this.props.navigation.navigate("ScheduleForm");
    }
  }

  openScheduleForm() {
    if (this.props.store.task.schedule) {
      this.props.navigation.navigate("ScheduleForm");
    }
  }

  render() {
    const { task, error, schedule } = this.props.store;
    const {
      toggledFieldContainer,
      valueText,
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
            value={task.title || ""}
            onChangeText={input => task.title = input}
            containerStyle={error && { borderBottomColor:"dodgerblue" }}
          />

          <FormLabel>Content</FormLabel>
          <FormInput
            multiline
            placeholder="Content"
            value={task.content || ""}
            onChangeText={input => task.content = input}
          />

        <View style={toggledFieldContainer}>
            <CheckBox
              title={<FormLabel labelStyle={checkboxLabel}>Due Date</FormLabel>}
              containerStyle={checkboxContainer}
              checked={Boolean(task.dueDate)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="dodgerblue"
              onPress={this.handleDueDate}
            />
          <Text style={valueText}>
            {Boolean(task.dueDate) && displayDate(task.dueDate)}
          </Text>
        </View>
        {
          task.dueDate && (
            <DatePickerIOS
              mode="date"
              date={new Date(task.dueDate)}
              minimumDate={new Date()}
              onDateChange={d => task.dueDate = d.valueOf()}
              />
          )
        }

        <View style={toggledFieldContainer}>
            <CheckBox
              title={<FormLabel labelStyle={checkboxLabel}>Schedule</FormLabel>}
              containerStyle={checkboxContainer}
              checked={Boolean(task.schedule)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="dodgerblue"
              onPress={this.openScheduleForm}
              onIconPress={this.handleSchedule}
            />
          <Text style={valueText}>
            {Boolean(task.schedule) }
          </Text>
        </View>
        </ScrollView>
      </View>
    );
  }
}

export default inject("store")(observer(TaskForm));

const styles = StyleSheet.create({
  toggledFieldContainer: {
    position:"relative",
    justifyContent:"center"
  },
  valueText: {
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
