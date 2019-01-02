import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import posed from "react-native-pose";

const Wrapper = posed(View)({
  draggable:"x",
  initial: { x: 0 },
  slid: { x: -50 },
  dragEnd: {x: 0, y: 0, }
});

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slid: false };
    this.handleSlide = this.handleSlide.bind(this);
  }

  handleSlide(node) {
    // debugger;
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

    return (
      <Wrapper onDragEnd={(e,f) => this.handleSlide(f)} pose={slid ? "slid" : "initial"}>
        <View style={{height:50, width:"100%", backgroundColor:"black", marginBottom:10}}></View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
