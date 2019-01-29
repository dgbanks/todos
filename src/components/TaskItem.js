import React from "react";
import { inject, observer } from "mobx-react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import Interactable from "react-native-interactable";
import posed from "react-native-pose";
import { displayDate, displaySchedule } from "../utils/timeUtils";

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      pastDue: props.task.dueDate < new Date().valueOf()
    };
    this.snap = this.snap.bind(this);
    this.forceUnsnap = this.forceUnsnap.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.slidItem && this.state.show) {
      this.forceUnsnap();
    }
  }

  snap({ nativeEvent: { state, x, targetSnapPointId } }) {
    const { uiStore } = this.props;
    if (state === "start" && x === 0) {
      uiStore.activateItem(this.checkboxWrapper)
      // this.setState({ show: true });
      // this.props.pingList();
    }
    if (state === "end" && targetSnapPointId === "closed") {
      uiStore.deactivateItem();
      // this.setState({ show: false });
      // this.props.pingList();
    }
  }

  forceUnsnap() {
    this.props.uiStore.deactivateItem();
    // this.checkboxWrapper.snapTo({ index: 0 });
    // this.setState({ show: false });
  }

  onClick(action) {
    if (this.props.uiStore.activeItem) {
      this.forceUnsnap();
      // this.props.pingList();
    } else { // navigate("TaskView"); toggleComplete() takes nothing
      action("TaskView");
    }
  }

  render() {
    const { show, pastDue } = this.state;
    const { task, toggleComplete, destroy, navigate, uiStore: { activeItem } } = this.props;
    const { container, button, checkbox, details } = styles;
    const detailStyles = Object.assign({}, details, {
      color: pastDue ? "red" : "dodgerblue"
    });

    return (
      <View style={container}>
        <Button onPress={destroy} pose={Boolean(activeItem) ? "show" : "hide"} style={button}>
          <Icon name="delete" color="white" />
        </Button>
        <Interactable.View
          ref={node => {this.checkboxWrapper = node;}}
          horizontalOnly={true}
          snapPoints={[{ x: 0, id: "closed" }, { x: -50, id: "open" }]}
          onDrag={this.snap}
          boundaries={{ right:0 }}
          style={{ width:"100%", backgroundColor:"white" }}
        >
          <Wrapper pose={task.complete ? "checked" : "unchecked"}>
            <CheckBox
              title={<Title task={task} style={detailStyles} />}
              checked={Boolean(task.complete)}
              checkedIcon="check-square"
              checkedColor="dodgerblue"
              onPress={() => this.onClick(navigate)}
              onIconPress={() => this.onClick(toggleComplete)}
              onLongPress={() => navigate("TaskForm")}
              containerStyle={checkbox}
            />
          </Wrapper>
        </Interactable.View>
      </View>
    );
  }
}

export default inject("uiStore")(observer(TaskItem));

const Title = ({task: { title, complete, dueDate, schedule, occurence }, style }) => (
  <View style={{ flex:1, marginLeft: complete ? 13.25 : 15 }}>
    <Text style={{fontWeight:"500"}}>{title}</Text>
    <Text style={style}>
      {(dueDate || occurence) && displayDate(dueDate || occurence)}
      {(schedule && !occurence) && displaySchedule(schedule)}
    </Text>
</View>
);

const Button = posed(TouchableOpacity)({
  show: { opacity: 1 },
  hide: { opacity: 0 }
});

const Wrapper = posed(TouchableOpacity)({
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
    alignItems:"center",
    borderWidth:0,
    borderBottomWidth:1
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
    top:18,
    left:10,
    color: "dodgerblue",
    fontSize:12,
    fontWeight:"300",
  }
});
