import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default DateRangeTab = ({ title }) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.line} />
    <Text style={styles.text}>{title}</Text>
    <View style={styles.line} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    paddingBottom:10,
    flexDirection:"row", //
    justifyContent:"space-around", //
    alignItems:"center",
  },
  text: {
    color:"gray"
  },
  line: {
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:"lightgray",
    width:"25%"
  }
});
