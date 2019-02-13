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
    this.snap = this.snap.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  snap({ nativeEvent: { state, x, targetSnapPointId } }) {
    const { uiStore } = this.props;
    if (state === "start" && x === 0) {
        uiStore.deactivateItem();
        uiStore.activateItem(this.checkboxWrapper);
    }
    if (state === "end" && targetSnapPointId === "closed") {
      uiStore.deactivateItem();
    }
  }

  onClick(action) {
    if (this.props.uiStore.activeItem) {
      this.props.uiStore.deactivateItem();
    } else { // navigate("TaskView"); toggleComplete() takes nothing
      action("TaskView");
    }
  }

  render() {
    const { task, toggleComplete, destroy, navigate, uiStore: { activeItem } } = this.props;
    const { container, button, checkbox, details } = styles;

    return (
      <View style={container}>
        <Button onPress={destroy} pose={"show"} style={button}>
          <Icon name="delete" color="white" />
        </Button>
        <Interactable.View
          ref={node => {this.checkboxWrapper = node;}}
          horizontalOnly={true}
          snapPoints={[{ x: 0, id: "closed" }, { x: -50, id: "open" }]}
          onDrag={this.snap}
          boundaries={{ left:-50, right:0 }}
          style={{ width:"100%", backgroundColor:"white" }}
        >

            <CheckBox
              title={<Title task={task} style={details} />}
              checked={Boolean(task.complete)}
              checkedIcon="check-square"
              checkedColor="dodgerblue"
              onPress={() => this.onClick(navigate)}
              onIconPress={() => this.onClick(toggleComplete)}
              onLongPress={() => navigate("TaskForm")}
              containerStyle={checkbox}
            />

        </Interactable.View>
      </View>
    );
  }
}

export default inject("uiStore")(observer(TaskItem));

const Title = ({task: { title, complete, dueDate, schedule, occurence }, style }) => (
  <Wrapper style={{ flex:1 }} pose={complete ? "checked" : "unchecked"}>
    <Text style={{fontWeight:"500"}}>{title}</Text>
    <Text style={style}>
      {(dueDate || occurence) && displayDate(dueDate || occurence)}
      {(schedule && !occurence) && displaySchedule(schedule)}
    </Text>
  </Wrapper>
);

const Button = posed(TouchableOpacity)({
  show: { opacity: 1 },
  hide: { opacity: 0 }
});

const Wrapper = posed(View)({
  checked: { opacity: .5, x: 13.5, transition: { duration: 0 } },
  unchecked: { opacity: 1, x: 15, transition: { duration: 0 } }
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
