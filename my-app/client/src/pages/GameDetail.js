import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  List,
  Message,
  Rating,
  Segment,
} from "semantic-ui-react";
import ImageCollage from "../components/ImageCollage";

export const GameDetail = (props) => {
  const [game, setGame] = useState(null);
  useEffect(() => {
    const savedGame = JSON.parse(localStorage.getItem("savedGame"));
    const savedURL = localStorage.getItem("savedURL");
    const currentURL = window.location.href;
    if (props.location.gameProps) {
      setGame(props.location.gameProps.game);
      localStorage.setItem(
        "savedGame",
        JSON.stringify(props.location.gameProps.game)
      );
      localStorage.setItem("savedURL", currentURL);
    } else if (currentURL === savedURL && savedGame) {
      setGame(savedGame);
    } else {
      setGame(null);
    }
  }, [props.location.gameProps]);
  return game ? (
    <>
      <Header as="h1" color="grey" textAlign="center" className="mb-3">
        {game.name}
      </Header>
      <Container className="mb-3 mx-auto pt-3 pb-3" style={{ width: "50%" }}>
        <Segment>
          <List divided relaxed>
            <List.Item className="mb-3">
              <List.Content>
                <List.Header className="mb-3">Name</List.Header>
                {game.name}
              </List.Content>
            </List.Item>
            <List.Item className="mb-3">
              <List.Content>
                <List.Header className="mb-3">Released</List.Header>
                {game.released}
              </List.Content>
            </List.Item>
            <List.Item className="mb-3">
              <List.Content>
                <List.Header className="mb-3">Genre(s):</List.Header>
                {game.genre.map((g) => `${g} | `)}
              </List.Content>
            </List.Item>
            <List.Item className="mb-3">
              <List.Content>
                <List.Header className="mb-3">Rating </List.Header>
                {game.rating}
                {"  | "}
                <Rating
                  icon="star"
                  defaultRating={Math.round(game.rating)}
                  maxRating={5}
                  disabled
                />
              </List.Content>
            </List.Item>
            <List.Item className="mb-3">
              <List.Content>
                <List.Header className="mb-3">Platform (s)</List.Header>
                {game.platform.map((p) => `${p} | `)}
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
      <Container textAlign="center" className="pb-5">
        <ImageCollage images={game.screenshot} />
      </Container>
    </>
  ) : (
    <Container text style={{ marginTop: "4em" }}>
      <Message negative>
        <Message.Header>Sorry... Requested game not found</Message.Header>
        <p>Please select a game</p>
      </Message>
    </Container>
  );

};
