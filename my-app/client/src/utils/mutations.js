import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        gameCount
        savedGames {
          gameId
          name
          released
          rating
          genre
          platform
          screenshot
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        gameCount
        savedGames {
          gameId
          name
          released
          rating
          genre
          platform
          screenshot
        }
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($gameData: GameInput!) {
    saveGame(gameData: $gameData) {
      _id
      username
      email
      gameCount
      savedGames {
        gameId
        name
        released
        rating
        genre
        platform
        screenshot
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId) {
      _id
      username
      email
      gameCount
      savedGames {
        gameId
        name
        released
        rating
        genre
        platform
        screenshot
      }
    }
  }
`;