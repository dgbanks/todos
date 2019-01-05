import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import posed from "react-native-pose";

const CheckBoxWrapper = posed(View)({
  label:"checkbox",
  draggable:"x",
  // dragging: { x: props => {debugger} },
  // dragBounds:{ left:0 },
  dragEnd: { x: 0, y: 0 },
  initial: { x: 0 },
  slid: { x: -50 },
});

const Button = posed(TouchableOpacity)({
  show: { opacity: 1 },
  hide: { opacity: 0 }
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
    const { slid } = this.state;

    const {
      task,
      details,
      update,
      destroy,
      navigate
    } = this.props;

    const {
      container,
      button,
      checkboxWrapper,
      checkbox,
      checkedText,
      uncheckedText
    } = styles;

    return (
      <View style={container}>
        <Button onPress={destroy} pose={slid ? "show" : "hide"} style={button}>
          <Icon name="delete" color="white" />
        </Button>
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
    backgroundColor:"white"
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
  button: {
    backgroundColor:"red",
    height:50,
    width:50,
    position:"absolute",
    top:0,
    right:0,
    marginRight:0,
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
