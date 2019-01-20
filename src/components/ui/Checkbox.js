import React from "react";
import { StyleSheet } from "react-native";
import { CheckBox, FormLabel } from "react-native-elements";

export default Checkbox = props => {
  const { container, label } = styles;
  return (
    <CheckBox
      {...props}
      title={<FormLabel labelStyle={label}>{props.title}</FormLabel>}
      containerStyle={container}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checkedColor="dodgerblue"
    />
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    position:"relative",
    justifyContent:"center"
  },
  valueText: {
    position:"absolute",
    right:50,
    color:"dodgerblue",
    fontWeight:"500"
  },
  container: {
    backgroundColor:"transparent",
    borderWidth:0
  },
  label: {
    marginTop:0
  }
});
