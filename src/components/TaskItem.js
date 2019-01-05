import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import Interactable from "react-native-interactable";
import posed from "react-native-pose";

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.snap = this.snap.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  snap({ nativeEvent }) {
    if (nativeEvent.state === "start" && nativeEvent.x === 0) {
      this.setState({ show: true });
    }
    if (nativeEvent.state === "end" && nativeEvent.x === 0) {
      this.setState({ show: false });
    }
  }

  onClick() {
    if (this.state.show) {
      this.checkboxWrapper.snapTo({ index: 0 });
      this.setState({ show: false });
    } else {
      this.props.navigate("TaskView");
    }
  }

  render() {
    const {
      task,
      hasdetails,
      update,
      destroy,
      navigate
    } = this.props;
    const {
      container,
      containerWithDetails,
      button,
      checkboxWrapper,
      checkedCheckboxWrapper,
      checkbox,
      checkedText,
      uncheckedText,
      details
    } = styles;

    return (
      <View style={container}>
        <Button
          onPress={destroy}
          pose={this.state.show ? "show" : "hide"}
          style={button}
        ><Icon name="delete" color="white" /></Button>
        <Interactable.View
          ref={node => this.checkboxWrapper = node}
          horizontalOnly={true}
          snapPoints={[{ x: 0, id: "closed" }, { x: -50, id: "open" }]}
          onDrag={this.snap}
          boundaries={{ right:0 }}
          style={Boolean(task.complete) ? checkedCheckboxWrapper : checkboxWrapper}
        >
          <CheckBox
            title={task.title}
            checked={Boolean(task.complete)}
            checkedIcon="check-square"
            checkedColor="lightblue"
            onPress={this.onClick}
            onIconPress={update}
            onLongPress={() => navigate("TaskForm")}
            containerStyle={checkbox}
            textStyle={Boolean(task.complete) ? checkedText : uncheckedText}
          />
        </Interactable.View>
      </View>
    );
  }
}

const Button = posed(TouchableOpacity)({
  show: { opacity: 1 },
  hide: { opacity: 0 }
});

const styles = StyleSheet.create({
  container: {
    position:"relative",
    alignItems:"center",
    height:50,
    marginTop:0,
    marginBottom:0,
  },
  checkboxWrapper: {
    position:"absolute",
    width:"100%",
    height:50,
    backgroundColor:"white"
  },
  checkedCheckboxWrapper: {
    position:"absolute",
    width:"100%",
    height:50,
    backgroundColor:"white",
    opacity:.5
  },
  checkbox: {
    width:"100%",
    marginLeft:0,
    marginTop:0,
    marginBottom:0,
    borderRadius:0,
    height:50,
    backgroundColor:"white",
    position:"relative"
  },
  checkedText: {
    marginLeft:13.5,
    fontWeight:"500",
    // opacity:.5
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
    justifyContent:"center",
    alignItems:"center"
  },
  details: {
    position:"absolute",
    width:"100%",
    bottom:0,
    zIndex:10
  }
});
