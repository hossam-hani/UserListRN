import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";

class header extends Component {
  constructor() {
    super();
    this.state = {
      num: 0,
      selectedIndex: 1
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.props.changePageHandler(selectedIndex);
    this.setState({ selectedIndex });
  }

  render() {
    const buttons = ["Hello", "World", "Buttons"];
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        selectedButtonStyle={{ backgroundColor: "#000" }}
        containerStyle={{ height: 50 }}
      />
    );
  }
}

export default header;
