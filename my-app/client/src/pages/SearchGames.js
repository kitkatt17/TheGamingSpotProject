import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Header,
  Icon,
  Input,
  Button,
  Card,
  Image,
  Segment,
  Dimmer,
  Loader,
  Rating,
  Message,
} from "semantic-ui-react";

import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { SAVE_GAME } from "../utils/mutations";
import { searchRawgGames } from "../utils/API";
import { saveGameIds, getSavedGameIds } from "../utils/localStorage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  useEffect(() => {
    saveGameIds(savedGameIds);
  }, [savedGameIds]);

  useEffect(() => {
    setSearchInput("");
    const fetchData = async () => {
      try {
        const response = await searchRawgGames("");

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const { results: items } = await response.json();
        const gameData = items.map((game) => ({
          gameId: game.id.toString(),
          name: game.name || "N/A",
          released: game.released || "N/A",
          rating: game.rating.toString() || "N/A",
          genre: game.genres.map((item) => item.name) || [],
          platform: game.platforms.map((item) => item.platform.name) || [],
          screenshot: game.short_screenshots.map((item) => item.image) || [],
        }));
        // console.log(gameData);
        setSearchedGames(gameData);
        setSearchInput("");
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const [saveGame] = useMutation(SAVE_GAME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await searchRawgGames(searchInput.trim());

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { results: items } = await response.json();
      const gameData = items.map((game) => ({
        gameId: game.id.toString(),
        name: game.name || "N/A",
        released: game.released || "N/A",
        rating: game.rating.toString() || "N/A",
        genre: game.genres.map((item) => item.name) || [],
        platform: game.platforms.map((item) => item.platform.name) || [],
        screenshot: game.short_screenshots.map((item) => item.image) || [],
      }));
      setSearchedGames(gameData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveGame = async (gameId) => {
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);
    try {
      // console.log(gameToSave)
      await saveGame({
        variables: { gameData: gameToSave },
        context: {
          headers: {
            authorization: Auth.getToken() ? `Bearer ${Auth.getToken()}` : "",
          },
        },
      });
      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Container
        style={{ marginTop: "2rem" }}
        textAlign="center"
        className="justify-content-center"
      >
        <Header as="h1" style={{ marginBottom: "2rem" }} className="mt-4 mb-4">
          <Icon name="gamepad" />
          <Header.Content>Search for Games!</Header.Content>
        </Header>
        <Form onSubmit={handleFormSubmit}>
          <Input
            action={{ color: "blue", content: "Search" }}
            icon="search"
            style={{ width: "70%" }}
            iconPosition="left"
            placeholder="Search for a game"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form>
      </Container>

      <Container className="mt-4 mb-4" textAlign="center">
        {searchedGames.length ? (
          <Message compact color="green" size="tiny">
            Viewing {searchedGames.length} results
          </Message>
        ) : (
          <Segment  style={{width:"100%",height:"100vh"}}>
            <Dimmer active inverted>
              <Loader size='large' inverted>Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
      </Container>

      <Container className="mt-3 mb-3">
        <Card.Group className="d-flex justify-content-center pb-4">
          {searchedGames.map((game) => {
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

                <Card.Content extra>
                  {Auth.loggedIn() && (
                    <Button
                      animated="vertical"
                      disabled={savedGameIds?.some(
                        (savedGameId) => savedGameId === game.gameId
                      )}
                      onClick={() => handleSaveGame(game.gameId)}
                    >
                      {savedGameIds?.some(
                        (savedGameId) => savedGameId === game.gameId
                      ) ? (
                        <Button.Content visible>
                          This game has already been saved!
                        </Button.Content>
                      ) : (
                        <>
                          <Button.Content visible>
                            Save this Game!
                          </Button.Content>
                          <Button.Content hidden>
                            <Icon name="heart" color="red" />
                          </Button.Content>
                        </>
                      )}
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

export default SearchGames;