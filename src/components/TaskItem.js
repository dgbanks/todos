import React from "react";
import { View, Text, Animated } from "react-native";
import { CheckBox } from "react-native-elements";
import posed from "react-native-pose";

const Wrapper = posed(View)({
  draggable:"x",
  dragEnd: {
    x: 0,
    transition: ({ value, toValue, gestureState, useNativeDriver }) =>{
      debugger;
      return gestureState.dx > 50 || gestureState.dx < -50
        ? Animated.decay(value, { velocity: gestureState.vx, useNativeDriver })
        : Animated.spring(value, { toValue, useNativeDriver });
      }
  },
  initial: { x: 0 },
  slid: { x: -50 }
});

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slid: false };
    this.handleSlide = this.handleSlide.bind(this);
  }

  handleSlide(node) {
    if (this.state.slid) {
      if (node.dx > 0) {
        this.setState({ slid: false });
      }
    } else {
      if (node.dx < - 75) {
        this.setState({ slid: true });
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

    return (
      <Wrapper pose={slid ? "slid" : "initial"} onDragEnd={(e,f) => this.handleSlide(f)}>
        <CheckBox
          title={task.title}
          checked={Boolean(task.complete)}
          onPress={() => navigate("TaskView", { task })}
          onIconPress={() => update(task.id, { complete: task.complete ? 0 : 1 })}
          onLongPress={() => navigate("TaskForm", { task })}
          containerStyle={{}}
        />
      </Wrapper>
    );
  }
}
