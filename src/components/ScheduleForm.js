import React from "react";
import { inject, observer } from "mobx-react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Icon, ButtonGroup } from "react-native-elements";
import Checkbox from "./ui/Checkbox";
import posed from "react-native-pose";
import DaysOfWeek from "./ui/DaysOfWeek";
import DatesOfMonth from "./ui/DatesOfMonth";

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDailyBasis = this.toggleDailyBasis.bind(this);
    this.toggleMonthlyBasis = this.toggleMonthlyBasis.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.toggleBasis = this.toggleBasis.bind(this);
  }

  toggleDailyBasis() {
    const { schedule } = this.props.store;
    if (schedule.basis !== "weekly") {
      schedule.basis = "weekly";
      schedule.days = [];
    }
  }

  toggleMonthlyBasis() {
    const { schedule } = this.props.store;
    if (schedule.basis !== "monthly") {
      schedule.basis = "monthly";
      schedule.days = [];
    }
  }

  toggleBasis(index) {
    const { store: { schedule } } = this.props;
    if (index === 0 && schedule.basis === "monthly") {
      schedule.basis = "weekly";
      schedule.days = [];
    }
    if (index === 1 && schedule.basis === "weekly") {
      schedule.basis = "monthly";
      schedule.days = [];
    }
  }

  handleSelectDate(date) {
    const { schedule } = this.props.store;
    if (schedule.days.includes(date)) {
      schedule.days = schedule.days.filter(d => d !== date);
    } else {
      schedule.days = [...schedule.days, date];
    }
  }

  render() {
    const { store: { schedule: { basis, days } } } = this.props;
    const {  } = styles;
    return (
      <View>
        <ButtonGroup
          buttons={["Weekly", "Monthly"]}
          onPress={this.toggleBasis}
          selectedIndex={basis === "weekly" ? 0 : 1}
          selectedButtonStyle={{ backgroundColor:"dodgerblue" }}
          />
        {
          // <Checkbox
          //   title="Weekly"
          //   checked={Boolean(basis === "weekly")}
          //   onIconPress={this.toggleDailyBasis}
          //   />

        }
        {
          basis === "weekly" && (
            <DaysOfWeek />
          )
        }

        {
          basis === "monthly" && (
            <DatesOfMonth />
          )
        }

        {
          // <Checkbox
          //   title="Monthly"
          //   checked={Boolean(basis === "monthly")}
          //   onIconPress={this.toggleMonthlyBasis}
          //   />

        }

      </View>
    );
  }
}

const Wrapper = posed(View)({
  show: { height: 200 },
  hide: { height: 0 }
});

export default inject("store")(observer(ScheduleForm));

const styles = StyleSheet.create({

});
