import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView, DatePickerIOS, Text, StyleSheet } from "react-native";
import { FormLabel, FormInput, CheckBox, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import uuid from "uuid";
import { displayDate } from "../utils/timeUtils";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    // if (props.navigation.state.params) {
    //   const {
    //     id,
    //     title,
    //     content,
    //     dueDate,
    //   } = props.navigation.state.params.task;
    //   this.state = { id, title, content, dueDate };
    // } else {
    //   this.state = {
    //     id: uuid(),
    //     title: "",
    //     content: "",
    //     parentId: "",
    //     complete: 0,
    //     completedAt: null,
    //     dueDate: null,
    //     schedule:null
    //   };
    // }
    this.state = {};
    // this.handleActivateDueDate = this.handleActivateDueDate.bind(this);
    // this.handleActivateSchedule = this.handleActivateSchedule.bind(this);
    // this.saveTask = this.saveTask.bind(this);
    // this.saveSchedule = this.saveSchedule.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.navigation.getParam("save", false)) {
      this.saveTask();
    }
  }

  handleActivateDueDate() {
    const { dueDate, schedule } = this.state;
    this.setState({
      dueDate: dueDate ? null : new Date().valueOf(),
      schedule: !dueDate && null
    });
  }

  handleActivateSchedule() {
    let { dueDate, schedule } = this.state;
    this.setState({
      dueDate: !schedule && null,
      schedule: schedule ? null : {}
    }, () => {
      schedule = this.state.schedule;
      if (schedule) {
        this.props.navigation.navigate("ScheduleForm", { schedule });
      }
    });
  }

  render() {
    const { dueDate, schedule } = this.state;
    const { task, error } = this.props.store;
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
            value={this.state.content}
            onChangeText={input => this.setState({ content: input })}
          />

        <View style={toggledFieldContainer}>
            <CheckBox
              title={<FormLabel labelStyle={checkboxLabel}>Due Date</FormLabel>}
              containerStyle={checkboxContainer}
              checked={Boolean(this.state.dueDate)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="dodgerblue"
              onPress={this.handleActivateDueDate}
            />
          <Text style={valueText}>
            {Boolean(dueDate) && displayDate(dueDate)}
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

        <View style={toggledFieldContainer}>
            <CheckBox
              title={<FormLabel labelStyle={checkboxLabel}>Schedule</FormLabel>}
              containerStyle={checkboxContainer}
              checked={Boolean(this.state.schedule)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="dodgerblue"
              onPress={this.handleActivateSchedule}
            />
          <Text style={valueText}>
            {Boolean(schedule) }
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
