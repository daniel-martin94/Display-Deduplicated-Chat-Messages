import React from "react";
import { render } from "react-dom";
import { Menu, Table, Icon } from "semantic-ui-react";

const Pagination = props => {
  let pages = [];
  const { totalPosts, postsPerPage, currentPage, changePage } = props;
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //Determines which menu item will be active
    if (i === currentPage) {
      pages.push(
        <Menu.Item key={i} onClick={() => props.changePage(i)} active href="!#">
          {i}
        </Menu.Item>
      );
    } else {
      pages.push(
        <Menu.Item key={i} onClick={() => props.changePage(i)} href="!#">
          {i}
        </Menu.Item>
      );
    }
  }
  return (
    <Table.Row>
      <Table.HeaderCell colSpan="4">
        <Menu floated="right" pagination>
          <Menu.Item
            onClick={props.changePage.bind(this, "decrement")}
            as="a"
            icon
          >
            <Icon name="chevron left" />
          </Menu.Item>
          {pages}
          <Menu.Item
            onClick={props.changePage.bind(this, "increment")}
            as="a"
            icon
          >
            <Icon name="chevron right" />
          </Menu.Item>
        </Menu>
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default Pagination;
