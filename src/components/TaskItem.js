import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import posed from "react-native-pose";
import { value } from "popmotion";

const CheckBoxWrapper = posed(View)({
  label:"checkbox",
  draggable:"x",
  dragEnd: { x: 0, y: 0 },
  initial: { x: 0 },
  slid: { x: -50 },
});

const NewButton = posed(TouchableOpacity)({
  passive: {
    opacity: ["x", {
      inputRange:[0, 1],
      outputRange:[0, 1],
    }, "checkbox"]
  }
});

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slid: false };
    this.handleSlide = this.handleSlide.bind(this);
  }

  handleSlide(node) {
    if (this.state.slid) {
      this.setState({ slid: false });
    } else {
      if (node.dx < - 75) {
        this.setState({ slid: true });
      } else {
        this.setState({ slid: false });
      }
    }
  }

  render() {
    const {
      task,
      details,
      update,
      destroy,
      navigate
    } = this.props;

    const { slid } = this.state;
    const {
      container,
      buttonWrapper,
      button,
      icon,
      checkboxWrapper,
      checkbox,
      checkedText,
      uncheckedText
    } = styles;

    return (
      <View style={container}>
        <Button
          icon={{name:"delete", color:"red", style: icon }}
          onPress={destroy}
          buttonStyle={button}
          containerViewStyle={buttonWrapper}
        />
        <CheckBoxWrapper
          onDragEnd={(e,f) => this.handleSlide(f)}
          pose={slid ? "slid" : "initial"}
          style={checkboxWrapper}
        >
          <CheckBox
            title={task.title}
            checked={Boolean(task.complete)}
            checkedIcon="check-square"
            onPress={() => slid ? this.setState({ slid: false }) : navigate("TaskView")}
            onIconPress={update}
            onLongPress={() => navigate("TaskForm")}
            containerStyle={checkbox}
            textStyle={Boolean(task.complete) ? checkedText : uncheckedText}
          />
        </CheckBoxWrapper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:"relative",
    height:48,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  checkboxWrapper: {
    position:"absolute",
    width:"100%",
  },
  checkbox: {
    width:"100%",
    marginLeft:"0%",
    borderRadius:0,
    height:48,
  },
  checkedText: {
    marginLeft:13.5,
    fontWeight:"500",
    opacity:.5
  },
  uncheckedText: {
    marginLeft:15,
    fontWeight:"500"
  },
  buttonWrapper: {
    position:"absolute",
    top:0,
    right:0,
    marginRight:0,
    height:"100%",
    width:50
  },
  button: {
    backgroundColor:"transparent",
    height:"100%",
    width:50
  },
  icon: {
    fontSize:20,
    marginLeft:0,
    marginRight:0,
  }
});
