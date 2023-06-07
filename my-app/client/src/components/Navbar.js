import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Button, Menu, Icon, Modal, Tab, Sticky } from "semantic-ui-react";

import Auth from "../utils/auth";

const reducer = (state, action) => {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true };
    default:
      throw new Error("Unsupported action...");
  }
};

const AppNavbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClick = (name) => setActiveItem(name);
  const [state, dispatch] = useReducer(reducer, {
    open: false,
  });

  const { open } = state;

  const panes = [
    {
      menuItem: "login",
      render: () => (
        <Tab.Pane attached={false}>
          <LoginForm handleModalClose={() => dispatch({ type: "close" })} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "signup",
      render: () => (
        <Tab.Pane attached={false}>
          <SignUpForm handleModalClose={() => dispatch({ type: "close" })} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Sticky>
        <div style={{ backgroundColor: "#000" }}>
          <Menu inverted fixed="top">
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={(e) => {
                handleItemClick("home");
              }}
              as={Link}
              to="/"
            >
              {" "}
              <Icon name="gamepad" /> Top Games
            </Menu.Item>

            <Menu.Menu position="right">
              {Auth.loggedIn() ? (
                <>
                  <Menu.Item
                    name="savedGames"
                    active={activeItem === "savedGames"}
                    as={Link}
                    to="/saved"
                  >
                    <Button
                      animated="vertical"
                      onClick={(e) => {
                        handleItemClick("savedGames");
                      }}
                    >
                      <Button.Content visible>Saved Games</Button.Content>
                      <Button.Content hidden>
                        <Icon name="heart" color="red" />
                      </Button.Content>
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button animated="vertical" onClick={Auth.logout} negative>
                      <Button.Content visible>Logout</Button.Content>
                      <Button.Content hidden>
                        <Icon name="sign-out" />
                      </Button.Content>
                    </Button>
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  <Button
                    animated="vertical"
                    onClick={() => dispatch({ type: "open" })}
                    positive
                  >
                    <Button.Content visible>Login/Sign Up</Button.Content>
                    <Button.Content hidden>
                      <Icon name="sign-in" />
                    </Button.Content>
                  </Button>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Menu>
        </div>
      </Sticky>
      
      <Modal
        closeIcon
        size="small"
        open={open}
        onClose={() => dispatch({ type: "close" })}
        style={{
          height: "auto",
          top: "auto",
          left: "auto",
          bottom: "auto",
          right: "auto",
        }}
      >
        <Modal.Content>
          <Tab menu={{ pointing: true }} panes={panes} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AppNavbar;
