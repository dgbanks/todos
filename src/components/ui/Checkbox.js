import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { CheckBox, FormLabel } from "react-native-elements";

export default Checkbox = props => {
  const { container, title, label, value } = styles;
  return (
    <CheckBox
      {...props}
      title={
        <View style={title}>
          <FormLabel labelStyle={label}>{props.title}</FormLabel>
          <Text style={value}>{props.value}</Text>
        </View>
      }
      containerStyle={container}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checkedColor="dodgerblue"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"transparent",
    borderWidth:0
  },
  title: {
    width:"90%",
    position:"relative",
    justifyContent:"center"
  },
  label: {
    marginTop:0
  },
  value: {
    position:"absolute",
    right:0,
    width:"50%",
    color:"dodgerblue",
    fontWeight:"500",
    textAlign:"center"
  }
});
