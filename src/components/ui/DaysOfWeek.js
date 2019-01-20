import React from "react";
import { inject, observer } from "mobx-react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

class DaysOfWeek extends React.Component {
  constructor(props) {
    super(props);
    this.daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    this.selectDay = this.selectDay.bind(this);
    this.selectEveryDay = this.selectEveryDay.bind(this);
  }

  selectDay(day) {
    const { store: { schedule } } = this.props;
    if (schedule.days.includes(day)) {
      schedule.days = schedule.days.filter(d => d !== day);
    } else {
      schedule.days = [...schedule.days, day];
    }
  }

  selectEveryDay() {
    const { store: { schedule } } = this.props;
    if (schedule.days.length === 7) {
      schedule.days = [];
    } else {
      schedule.days = [0,1,2,3,4,5,6];
    }
  }

  render() {
    const { store: { schedule: { days } } } = this.props;
    const { itemWrapper, lastItemWrapper, item, itemText } = styles;
    return (
      <View style={{ alignItems:"center" }}>
        <View style={{ width: "75%"}}>
          <View style={itemWrapper}>
          <TouchableOpacity style={item} onPress={this.selectEveryDay}>
            <Icon
              name="check"
              color={days.length === 7 ?"dodgerblue" : "transparent"}
            />
            <Text style={itemText}>Every Day</Text>
          </TouchableOpacity>
        </View>
          {
            this.daysOfWeek.map((day, idx) => (
              <View style={idx === 6 ? lastItemWrapper : itemWrapper}>
              <TouchableOpacity
                style={item}
                onPress={() => this.selectDay(idx)}
              >
                <Icon
                  name="check"
                  color={days.includes(idx) ? "dodgerblue" : "transparent"}
                />
                <Text style={itemText}>{day}</Text>
              </TouchableOpacity>
            </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default inject("store")(observer(DaysOfWeek));

const styles = StyleSheet.create({
  itemWrapper: {
    borderColor:"lightgray",
    borderTopWidth:1,
    // borderRightWidth:1,
    // borderLeftWidth:1,
  },
  lastItemWrapper: {
    borderColor:"lightgray",
    borderTopWidth:1,
    borderBottomWidth:1,
  },
  item: {
    padding:10,
    flexDirection:"row",
    alignItems:"center"
  },
  itemText: {
    color:"gray",
    fontSize:15,
    marginLeft:5
  }
});
