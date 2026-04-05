import Game from "../models/game.js";
import Query from "../models/Query.js";
import moment from "moment";

export const createGame = async (req, res) => {
  try {
    const { sport, area, date, time, admin, totalPlayers } = req.body;

    const newGame = new Game({
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      players: [admin],
    });

    const savedGame = await newGame.save();

    return res.status(200).json(savedGame);
  } catch (err) {
    res.status(500).json({ message: "Failed to create game" });
  }
};

export const getGames = async (req, res) => {
  try {
    const games = await Game.find({})
      .populate("admin")
      .populate("players", "image firstName lastName");

    const currentDate = moment();

    const filteredGames = games?.filter((game) => {
      if (!game || !game.date) return false;

      let gameDate;

      if (game.date.toLowerCase() === "tomorrow") {
        gameDate = moment().add(1, "days"); // Convert "Tomorrow" to actual date
      } else if (game.date.toLowerCase() === "today") {
        gameDate = moment(); // Convert "Today" to current date
      } else {
        gameDate = moment(game.date, "DD MMMM"); // Parse normal date format like "12 March"
      }

      // const gameTime = game.time.split(" - ")[0];

      // const gameDateTime = moment(
      //   `${gameDate.format("YYYY-MM-DD")} ${gameTime}`,
      //   "YYYY-MM-DD h:mm A"
      // );

      if (!gameDate.isValid()) return false;

      return gameDate.isSameOrAfter(currentDate, "day");
    });

    const formattedGames = filteredGames.map((game) => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      time: game.time,
      area: game.area,
      players: game.players.map((player) => ({
        _id: player._id,
        imageUrl: player.image, // Player's image URL
        name: player
          ? `${player.firstName} ${player.lastName}`
          : "Unknown Player", // Optional: Player's name
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      adminName: game.admin
        ? `${game.admin.firstName} ${game.admin.lastName}`
        : "No Admin",
      adminUrl: game.admin?.image || "", // Assuming the URL is stored in the image field
      adminId: game.admin?._id,
      matchFull: game.matchFull,
    }));

    return res.json(formattedGames);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch game" });
  }
};

export const upcomingGame = async (req, res) => {
  try {
    const userId = req.userId;

    const games = await Game.find({
      $or: [{ admin: userId }, { players: userId }],
    })
      .populate("admin")
      .populate("players", "image firstName lastName");

    const formattedGames = games.map((game) => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      time: game.time,
      area: game.area,
      players: game.players.map((player) => ({
        _id: player._id,
        imageUrl: player.image, // Player's image URL
        name: `${player.firstName} ${player.lastName}`, // Optional: Player's name
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      courtNumber: game.courtNumber,
      adminName: `${game.admin.firstName} ${game.admin.lastName}`,
      adminUrl: game.admin.image, // Assuming the URL is stored in the image field
      isUserAdmin: game.admin._id.toString() === userId,
      matchFull: game.matchFull,
    }));

    return res.json(formattedGames);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch games" });
  }
};

export const requestToJoinGameByGameId = async (req, res) => {
  try {
    const { userId, comment } = req.body; // Assuming the userId and comment are sent in the request body
    const { gameId } = req.params;

    // Find the game by ID
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Check if the user has already requested to join the game
    const existingRequest = game.requests.find(
      (request) => request.userId.toString() === userId,
    );
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // Add the user's ID and comment to the requests array
    game.requests.push({ userId, comment });

    // Save the updated game document
    await game.save();

    res.status(200).json({ message: "Request sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send request" });
  }
};

export const fetchingGamesByGamesId = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate({
      path: "requests.userId",
      select: "email firstName lastName image skill noOfGames playpals sports", // Select the fields you want to include
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const requestsWithUserInfo = game.requests.map((request) => ({
      userId: request.userId._id,
      email: request.userId.email,
      firstName: request.userId.firstName,
      lastName: request.userId.lastName,
      image: request.userId.image,
      skill: request.userId.skill,
      noOfGames: request.userId.noOfGames,
      playpals: request.userId.playpals,
      sports: request.userId.sports,
      comment: request.comment,
    }));

    res.json(requestsWithUserInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

export const acceptRequestToJoinGame = async (req, res) => {
  const { gameId, userId } = req.body;

  try {
    // Find the game
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    game.players.push(userId);

    // Remove the user from the requests array
    // game.requests.splice(requestIndex, 1);

    await Game.findByIdAndUpdate(
      gameId,
      {
        $pull: { requests: { userId: userId } },
      },
      { new: true },
    );

    // Save the updated game
    await game.save();

    res.status(200).json({ message: "Request accepted", game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlayersByGameId = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate("players");

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).json(game.players);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch players" });
  }
};

export const matchFull = async (req, res) => {
  try {
    const { gameId } = req.body;

    // Find the game by its ID
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Toggle the matchFull status
    game.matchFull = !game.matchFull;
    await game.save();

    res.json({
      message: "Match full status updated",
      matchFull: game.matchFull,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update match full status" });
  }
};

// Post a query to a specific game
export const sendQuery = async (req, res) => {
  try {
    const { gameId, senderId, message } = req.body;

    if (!gameId || !senderId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuery = new Query({
      gameId,
      senderId,
      message,
    });

    await newQuery.save();
    res.status(201).json({ success: true, data: newQuery });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all queries for a specific game
export const getGameQueries = async (req, res) => {
  try {
    const { gameId } = req.params;
    const queries = await Query.find({ gameId })
      .populate("senderId", "firstName lastName image") // Player ki info nikalne ke liye
      .sort({ createdAt: -1 });

    res.status(200).json(queries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching queries", error: error.message });
  }
};

export const replyToQuery = async (req, res) => {
  try {
    const { queryId, reply } = req.body;
    const updatedQuery = await Query.findByIdAndUpdate(
      queryId,
      { reply: reply, repliedAt: Date.now() },
      { new: true },
    );
    res.status(200).json({ success: true, data: updatedQuery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
