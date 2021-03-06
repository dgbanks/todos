import React from "react";
import { inject, observer } from "mobx-react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

class DatesOfMonth extends React.Component {
  constructor(props) {
    super(props);
    const array = [];
    for (var i = 0; i < 31; i++) {
      array.push(i);
    }
    this.datesOfMonth = array;
    this.selectDate = this.selectDate.bind(this);
  }

  selectDate(date) {
    const { dataStore: { schedule } } = this.props;
    if (schedule.days.includes(date)) {
      schedule.days = schedule.days.filter(d => d !== date);
    } else {
      schedule.days = [...schedule.days, date].sort((a,b) => a < b ? -1 : 1);
    }
  }

  render() {
    const { dataStore: { schedule: { days } } } = this.props;
    const { container, date, text, icon, last } = styles;
    return (
      <View style={container}>
        {
          this.datesOfMonth.map(num => (
            <TouchableOpacity style={date} onPress={() => this.selectDate(num + 1)}>
              <Text style={text}>{num + 1}</Text>
              <Icon name="check" containerStyle={icon}
                color={days.includes(num + 1) ? "dodgerblue" : "transparent"}
              />
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity style={last} onPress={() => this.selectDate(0)}>
          <Text style={text}>Last of Month</Text>
          <Icon name="check" containerStyle={icon}
            color={days.includes(0) ? "dodgerblue" : "transparent"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default inject("dataStore")(observer(DatesOfMonth));

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    borderColor:"lightgray",
    borderWidth:1,
    backgroundColor:"lightgray"
  },
  date: {
    width:"14%",
    paddingBottom:"14%",
    position:"relative",
    justifyContent:"center",
    alignItems:"center",
    borderColor:"lightgray",
    borderWidth:1,
    backgroundColor:"white"
  },
  text: {
    position:"absolute",
    color:"gray"
  },
  icon: {
    position:"absolute",
    bottom:1
  },
  last: {
    width:"56%",
    paddingBottom:"14%",
    position:"relative",
    justifyContent:"center",
    alignItems:"center",
    borderColor:"lightgray",
    borderWidth:1,
    backgroundColor:"white"
  },
});
