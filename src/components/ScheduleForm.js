import React from "react";
import { inject, observer } from "mobx-react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import Checkbox from "./ui/Checkbox";

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDailyBasis = this.toggleDailyBasis.bind(this);
    this.toggleMonthlyBasis = this.toggleMonthlyBasis.bind(this);
  }

  toggleDailyBasis() {
    const { schedule } = this.props.store;
    schedule.basis = "daily";
  }

  toggleMonthlyBasis() {
    const { schedule } = this.props.store;
    schedule.basis = "monthly";
  }

  render() {
    const { navigation, store: { schedule } } = this.props;
    const { container, label } = styles;
    return (
      <View>
        <Checkbox
          title="Daily"
          checked={Boolean(schedule.basis === "daily")}
          onIconPress={this.toggleDailyBasis}
        />
        {
          schedule.basis === "daily" && (
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
              {
                ["Su", "M", "T", "W", "Th", "F", "Sa"].map(d => (
                  <View style={{borderWidth:1, borderColor:"black",width:"25%", paddingTop:10, paddingBottom:10}}>
                    <Icon
                      name="remove"
                      raised reverse
                    />
                  </View>
                ))
              }
            </View>
          )
        }
        <Checkbox
          title="Monthly"
          checked={Boolean(schedule.basis === "monthly")}
          onIconPress={this.toggleMonthlyBasis}
        />
        {
          schedule.basis === "monthly" && (
            <View></View>
          )
        }

      </View>
    );
  }
}

export default inject("store")(observer(ScheduleForm));

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
  }
});
