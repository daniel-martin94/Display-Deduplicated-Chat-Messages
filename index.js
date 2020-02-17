import React, { Component, useState } from "react";
import Messages from "./components/Messages";
import Pagination from "./components/Pagination";
import { render } from "react-dom";
import { Button, Container, Header, Divider, Grid } from "semantic-ui-react";
import "./style.css";

// This is the list of messages.
import { messages } from "./data.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: false,
      messages: messages,
      currentPage: 1,
      postsPerPage: 5
    };
    this.sortMessages = this.sortMessages.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  //Will sort messages based on boolean
  sortMessages() {
    //When sort is true -> ascending, false -> descending
    let tempMessages = this.state.messages;

    if (this.state.sort) {
      // Sort messages to descending
      tempMessages.sort(function(a, b) {
        return new Date(b.sentAt) - new Date(a.sentAt);
      });
    } else {
      //Sort messages to ascending
      tempMessages.sort(function(a, b) {
        return new Date(a.sentAt) - new Date(b.sentAt);
      });
    }
    this.setState(state => ({
      sort: !state.sort,
      messages: tempMessages
    }));
  }
  //Filter will only return items not equal to obj to delete
  deleteMessage(obj) {
    let temp = this.state.messages.filter(function(element) {
      return element != obj;
    });
    this.setState(state => ({
      messages: temp
    }));
  }
  //Changes the current page number based on on the type
  changePage(type) {
    const { currentPage, postsPerPage, messages } = this.state;
    if (type == "decrement" && currentPage > 1) {
      this.setState(state => ({
        currentPage: this.state.currentPage - 1
      }));
    } else if (
      type == "increment" &&
      currentPage < Math.ceil(messages.length / postsPerPage)
    ) {
      this.setState(state => ({
        currentPage: this.state.currentPage + 1
      }));
    } else if (
      Number.isInteger(type)
    ) {
      this.setState(state => ({
        currentPage: type
      }));
    }
  }
  //Added this to initalize sorting after rendering on startup
  componentDidMount() {
    this.sortMessages();
  }
  render() {
    // Simple Assignment Shorthand
    const { sort, currentPage, postsPerPage, messages } = this.state;
    return (
      <Container>
        <Header as="h2">Displaying Deduplicated Chat Messages</Header>
        <Divider />
        <Messages
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          messages={messages}
          deleteMessage={this.deleteMessage}
        />
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column textAlign="left">
              <Button
                content="Sort"
                size="medium"
                onClick={this.sortMessages}
                icon={
                  sort ? "sort content ascending" : "sort content descending"
                }
                labelPosition="right"
              />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Pagination
                currentPage={currentPage}
                changePage={this.changePage}
                postsPerPage={postsPerPage}
                totalPosts={messages.length}
              >
              </Pagination>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

render(<App />, document.getElementById("root"));
