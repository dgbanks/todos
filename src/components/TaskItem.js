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
    this.forceUnsnap = this.forceUnsnap.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.slidItem && this.state.show) {
      this.forceUnsnap();
    }
  }

  snap({ nativeEvent }) {
    if (nativeEvent.state === "start" && nativeEvent.x === 0) {
      this.setState({ show: true });
      this.props.pingList();
    }
    if (nativeEvent.state === "end" && nativeEvent.x === 0) {
      this.setState({ show: false });
      this.props.pingList();
    }
  }

  forceUnsnap() {
    this.checkboxWrapper.snapTo({ index: 0 });
    this.setState({ show: false });
  }

  onClick(action) {
    if (this.props.slidItem) {
      this.forceUnsnap();
      this.props.pingList();
    } else { // navigate("TaskView"); toggleComplete() takes nothing
      action("TaskView");
    }
  }

  render() {
    const { show } = this.state;
    const { task, toggleComplete, destroy, navigate } = this.props;
    const { container, button, checkbox, text, wrapper, details } = styles;
    return (
      <View style={container}>
        <Button onPress={destroy} pose={show ? "show" : "hide"} style={button}>
          <Icon name="delete" color="white" />
        </Button>
        <Interactable.View
          ref={node => {this.checkboxWrapper = node}}
          horizontalOnly={true}
          snapPoints={[{ x: 0, id: "closed" }, { x: -50, id: "open" }]}
          onDrag={this.snap}
          boundaries={{ right:0 }}
          style={{ width:"100%", backgroundColor:"white" }}
        >
          <Wrapper style={wrapper} pose={task.complete ? "checked" : "unchecked"}>
            <CheckBox
              title={task.title}
              checked={Boolean(task.complete)}
              checkedIcon="check-square"
              checkedColor="lightblue"
              onPress={() => this.onClick(navigate)}
              onIconPress={() => this.onClick(toggleComplete)}
              onLongPress={() => navigate("TaskForm")}
              containerStyle={checkbox}
              wrapperStyle={{alignItems:"center", width:"100%"}}
              textStyle={Object.assign({}, text, { marginLeft: task.complete ? 13.5 : 15 })}
            />
            {
              task.dueDate && (
                <Text style={details}>dueDate</Text>
              )
            }
          </Wrapper>
        </Interactable.View>
      </View>
    );
  }
}


const Button = posed(TouchableOpacity)({
  show: { opacity: 1 },
  hide: { opacity: 0 }
});

const Wrapper = posed(View)({
  checked: { opacity: .5 },
  unchecked: { opacity: 1 }
});

const styles = StyleSheet.create({
  container: {
    position:"relative",
    alignItems:"center",
    height:50,
    marginTop:0,
    marginBottom:0,
  },
  checkbox: {
    width:"100%",
    marginLeft:0,
    marginTop:0,
    marginBottom:0,
    borderRadius:0,
    height:50,
    backgroundColor:"white",
    position:"relative",
    alignItems:"center"
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
  text: {
    fontWeight:"500",
    flex:1,
  },
  wrapper: {
    position:"relative"
  },
  details: {
    position:"absolute",
    bottom:2,
    left:50,
    color: "#4a4a4a",
    fontWeight:"300"
  }
});
