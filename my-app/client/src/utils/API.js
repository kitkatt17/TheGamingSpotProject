export const searchRawgGames = (query) => {
    if (query !== "") {
        query = query.replace(/\s+/g, "-").toLowerCase().trim();
        return fetch (
            `https://rawg.io/api/games?search=${query}&key=${process.env.REACT_APP_KEY.trim()}`
        );
    } else {
        return fetch (`https://rawg.io/api/collections/must-play/games`);
    }
};