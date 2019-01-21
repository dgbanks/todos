import React from "react";
import { inject, observer } from "mobx-react";
import { View, ScrollView, DatePickerIOS, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";
import Checkbox from "./ui/Checkbox";
import {
  displayDate,
  displayWeeklySchedule,
  displayMonthlySchedule
} from "../utils/timeUtils";

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
      // task.dueDate = null; moved to store
      this.props.navigation.navigate("ScheduleForm");
    }
  }

  openScheduleForm() {
    const { task } = this.props.store;
    if (task.schedule) {
      this.props.store.schedule = task.schedule;
      this.props.navigation.navigate("ScheduleForm");
    }
  }

  render() {
    const { task, error } = this.props.store;
    const { schedule } = task;
    const { toggledFieldContainer, valueText, wrapper, text } = styles;

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
          <Checkbox
            title="Due Date"
            checked={Boolean(task.dueDate)}
            onPress={this.handleDueDate}
            value={Boolean(task.dueDate) && displayDate(task.dueDate)}
          />
        {
          // <TouchableOpacity style={wrapper}>
          //   <Text style={text}>
          //     {Boolean(task.dueDate) && displayDate(task.dueDate)}
          //   </Text>
          // </TouchableOpacity>

        }

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
          <Checkbox
            title="Schedule"
            checked={Boolean(schedule)}
            onPress={this.openScheduleForm}
            onIconPress={this.handleSchedule}
            value={
              (!!schedule && schedule.basis === "weekly") ? (
                displayWeeklySchedule(schedule.days)
              ) : (!!schedule && schedule.basis === "monthly") ? (
                displayMonthlySchedule(schedule.days)
              ) : ""
            }
          />
        {
          // <TouchableOpacity style={wrapper}>
          //   <Text style={text}>
          //     {
          //       (!!task.schedule && task.schedule.basis === "weekly") && (
          //         displayWeeklySchedule(task.schedule.days)
          //       )
          //     }
          //   </Text>
          // </TouchableOpacity>
          // <TouchableOpacity style={wrapper}>
          //   <Text style={text}>
          //     {
          //       (!!task.schedule && task.schedule.basis === "monthly") && (
          //         displayMonthlySchedule(task.schedule.days)
          //       )
          //     }
          //   </Text>
          // </TouchableOpacity>

        }
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
    fontWeight:"500",
    width:"40%",
    flexWrap:"wrap",
    textAlign:"center",
  },
  wrapper: {
    position:"absolute",
    right:50,
    width:"40%",
  },
  text: {
    color:"dodgerblue",
    fontWeight:"500",
  }
});
