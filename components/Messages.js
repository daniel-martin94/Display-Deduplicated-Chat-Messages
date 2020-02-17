import React from 'react';
import { render } from 'react-dom';
import { Button, Table, Icon }  from 'semantic-ui-react';

//Removes duplicated messages based on UUID and content
function deduplicateMessages(messages) {
  let noDuplicates = []
  //Filter the messages based on passing the anonymous function result
  noDuplicates = messages.filter((obj, index, messArray) 
    //Find the Index of the current element
    => messArray.findIndex((element)
      //Current element of messArry must equal obj content and senderUUID and element index must equal index from filter
      //If the element index does not match the first matched index of filter, it is not added
      => element['content'] === obj['content'] && element['senderUuid'] === obj['senderUuid']) === index)
  return noDuplicates
}
//Provides readable timestamp in data
function cleanDateTime(objects) {
  //Preserved the timestamp in data for sorting 
  let cleanedDateTime = objects.map(function(obj, index){
    let tempDateTime = new Date(obj['sentAt']);
    obj["readableTime"] = tempDateTime.toDateString() + " at " + tempDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  })
  return objects
}
const Messages = (props) => {
  // This component will clean up and display the messages data
  // Clean up will require removing duplicate messages and cleaning up datetime stamp
  let { messages, currentPage, postsPerPage, deleteMessage } = props
  
  //To remove duplicate messages
  let deduplicatedMessages = deduplicateMessages(messages)
  //Cleans up datetime stamps
  cleanDateTime(deduplicatedMessages)

  //Determine values for Pagination
  let lastIndex = currentPage * postsPerPage
  let firstIndex = lastIndex - postsPerPage
  let currentPosts = deduplicatedMessages.slice(firstIndex, lastIndex);

  let cleanedMessages = currentPosts.map(function(message, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell>{message.senderUuid}</Table.Cell>
        <Table.Cell>{message.content}</Table.Cell>
        <Table.Cell>{message.readableTime}</Table.Cell>
        {/*Here we used the passed prop function for children components to call*/}
        <Table.Cell>
          <Button size="mini" basic color='red' icon onClick={deleteMessage.bind(this, message)}>
            <Icon name='trash' />
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  })
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sender ID</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Sent At</Table.HeaderCell>
          <Table.HeaderCell>Remove</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    <Table.Body>
      {cleanedMessages}
    </Table.Body>
  </Table>
  )
}

export default Messages