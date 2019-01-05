import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
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
    } else {
      if (nativeEvent.state !== "end") {
        this.setState({ show: false });
      }
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
    const { show } = this.state;
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
        <Button onPress={destroy} pose={show ? "show" : "hide"} style={button}>
          <Icon name="delete" color="white" />
        </Button>
        <Interactable.View
          ref={node => this.checkboxWrapper = node}
          horizontalOnly={true}
          snapPoints={[{ x: 0, id: "closed" }, { x: -50, id: "open" }]}
          onDrag={this.snap}
          boundaries={{ right:0 }}
          style={{ width: "100%", backgroundColor: "white" }}
        >
          <CheckBox
            title={task.title}
            checked={Boolean(task.complete)}
            checkedIcon="check-square"
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
    backgroundColor:"white",
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
