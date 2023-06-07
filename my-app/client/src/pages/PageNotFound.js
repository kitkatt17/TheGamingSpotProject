import React from "react";
import { Container, Header, Icon, Message } from "semantic-ui-react";

export const PageNotFound = () => {
  return (
    <Container
      fluid
      className="not-found-container"
      textAlign="center"
      style={{ width: "50vw" }}
    >
      <Message negative>
        <Message.Header>
          <span className="display-1"></span><br/>Requested page not found<br/>404{" "}
          <Header as="h2" icon>
          <span className="wave-animation">
            🎮
          </span>
          </Header>
        </Message.Header>
        <p>Please navigate to a valid page</p>
      </Message>
    </Container>
  );
};