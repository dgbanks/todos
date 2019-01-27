import React from "react";
import { inject, observer } from "mobx-react";
import { View } from "react-native";
import { ButtonGroup } from "react-native-elements";
import Checkbox from "./ui/Checkbox";
import DaysOfWeek from "./ui/DaysOfWeek";
import DatesOfMonth from "./ui/DatesOfMonth";

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleBasis = this.toggleBasis.bind(this);
  }

  toggleBasis(index) {
    const { dataStore: { schedule } } = this.props;
    if (index === 0 && schedule.basis === "monthly") {
      schedule.basis = "weekly";
      schedule.days = [];
    }
    if (index === 1 && schedule.basis === "weekly") {
      schedule.basis = "monthly";
      schedule.days = [];
    }
  }

  render() {
    const { dataStore: { schedule: { basis, days } } } = this.props;
    return (
      <View>
        <ButtonGroup
          buttons={["Weekly", "Monthly"]}
          onPress={this.toggleBasis}
          selectedIndex={basis === "weekly" ? 0 : 1}
          selectedButtonStyle={{ backgroundColor:"dodgerblue" }}
          />
        {basis === "weekly" && <DaysOfWeek />}

        {basis === "monthly" && <DatesOfMonth />}
      </View>
    );
  }
}

export default inject("dataStore")(observer(ScheduleForm));
