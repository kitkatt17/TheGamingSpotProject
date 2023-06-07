import React from "react";
import { useQuery, useMutation } from "@apollo/client";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { GET_ME } from "../utils/queries";
import { REMOVE_GAME } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeGameId } from "../utils/localStorage";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Header,
  Icon,
  Image,
  Loader,
  Message,
  Rating,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SavedGames = () => {
  const { loading, data } = useQuery(GET_ME, {
    context: {
      headers: {
        authorization: Auth.getToken() ? `Bearer ${Auth.getToken()}` : "",
      },
    },
  }
  );
  const [removeGame] = useMutation(REMOVE_GAME);

  const userData = data?.me || {};

  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      // console.log(gameId)
      const { data } = await removeGame({
        variables: { gameId: gameId },
        context: {
          headers: {
            authorization: Auth.getToken() ? `Bearer ${Auth.getToken()}` : "",
          },
        },
      });

      if (!data) {
        throw new Error("Something went wrong!");
      }

      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  }

  return (
    <>
      <Container style={{ marginTop: "2rem" }} textAlign="left">
        <Header as="h1">
          {/* <Icon name="save" size="tiny" /> */}
          <Header.Content>Saved games!</Header.Content>
        </Header>
      </Container>
      <Container style={{ marginTop: "2rem" }} textAlign="center">
        {userData.savedGames && userData.savedGames.length ? (
          <Message compact color="green" size="tiny">
            Showing {userData.savedGames.length} saved{" "}
            {userData.savedGames.length === 1 ? "game" : "games"}
          </Message>
        ) : (
          <Message compact color="red" size="tiny">
            You have no saved games!
          </Message>
        )}
      </Container>
      <Container style={{ marginTop: "2rem" }}>
        <Card.Group className="d-flex justify-content-center">
          {userData.savedGames &&
            userData.savedGames.map((game) => {
              const slug = game.name.toLowerCase().replace(/\s/g, "-");
              return (
                <Card key={game.gameId}>
                  <Card.Content>
                    <Link
                      to={{
                        pathname: `/game/${slug}`,
                        gameProps: {
                          game: game,
                        },
                      }}
                    >
                      <Image
                        size="big"
                        src={
                          game.screenshot[0] ||
                          "https://dummyimage.com/600x400/c7c7c7/ffffff.jpg&text=No+image+available"
                        }
                        rounded
                        centered
                      />
                      <Card.Header style={{ marginTop: "1rem" }}>
                        {game.name}
                      </Card.Header>
                    </Link>
                    <Card.Meta>
                      Released year : {game.released.slice(0, 4) || "N/A"}
                    </Card.Meta>
                    <Card.Description>
                      <Rating
                        icon="star"
                        defaultRating={Math.round(game.rating)}
                        maxRating={5}
                        disabled
                      />
                    </Card.Description>
                  </Card.Content>

                  <Card.Content extra textAlign="center">
                    {Auth.loggedIn() && (
                      <Button
                        animated="vertical"
                        onClick={() => handleDeleteGame(game.gameId)}
                        negative
                      >
                        <Button.Content visible>
                          Delete this Game!
                        </Button.Content>
                        <Button.Content hidden>
                          <Icon name="trash" />
                        </Button.Content>
                      </Button>
                    )}
                  </Card.Content>
                </Card>
              );
            })}
        </Card.Group>
      </Container>
    </>
  );
};

export default SavedGames;