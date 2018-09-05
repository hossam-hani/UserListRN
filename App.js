/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import { ScrollView, Text, Image } from "react-native";
import { List, ListItem } from "react-native-elements";
import axios from "axios";
import { Button } from "react-native-elements";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      page: 1,
      noMoreUsers: false
    };
    this.getMoreUsers = this.getMoreUsers.bind(this);
  }

  async componentDidMount() {
    const { page } = this.state;
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    const users = res.data.data;
    this.setState({
      users: [...this.state.users, ...users],
      page: this.state.page + 1
    });
  }

  async getMoreUsers() {
    this.setState({
      isLoading: true
    });
    const { page } = this.state;
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    const users = res.data.data;
    this.setState({
      users: [...this.state.users, ...users],
      page: this.state.page + 1,
      isLoading: false,
      noMoreUsers: users.length === 0
    });
  }

  render() {
    let userElements;
    const { users, isLoading, noMoreUsers } = this.state;

    if (users.length !== 0) {
      userElements = users.map((l, i) => (
        <ListItem
          key={i}
          roundAvatar
          avatar={{ uri: l.avatar }}
          title={`${l.first_name} ${l.last_name}`}
        />
      ));
    } else {
      userElements = <Text style={{ padding: 10 }}>Loading ...</Text>;
    }
    return (
      <ScrollView style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={{ fontSize: 30, padding: 10 }}>
          USERS
          {isLoading ? (
            <Text style={{ fontSize: 15, color: "green", marginLeft: 10 }}>
              loading ....
            </Text>
          ) : null}
        </Text>

        <List containerStyle={{ marginBottom: 20 }}>{userElements}</List>
        {noMoreUsers ? (
          <Text style={{ padding: 20 }}>No More Users !</Text>
        ) : (
          <Button
            small
            icon={{ name: "refresh", type: "font-awesome" }}
            title="Load More Users"
            backgroundColor="#2c3e50"
            onPress={this.getMoreUsers}
            disabled={isLoading}
          />
        )}
      </ScrollView>
    );
  }
}
