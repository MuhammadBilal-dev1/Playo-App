import express from "express";
import {
  createGame,
  acceptRequestToJoinGame,
  fetchingGamesByGamesId,
  getGames,
  getPlayersByGameId,
  matchFull,
  requestToJoinGameByGameId,
  upcomingGame,
  sendQuery,
  getGameQueries,
  replyToQuery,
} from "../controllers/gameController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/creategame", auth, createGame);
router.get("/", getGames);
router.get("/upcoming", auth, upcomingGame);
router.post("/:gameId/request", auth, requestToJoinGameByGameId);
router.get("/:gameId/requests", auth, fetchingGamesByGamesId);
router.post("/accept", auth, acceptRequestToJoinGame);
router.get("/:gameId/players", auth, getPlayersByGameId);
router.post("/toggle-match-full", auth, matchFull);

// Query Routes
router.post('/send-query',auth, sendQuery);
router.get('/:gameId/queries', auth, getGameQueries);
router.put('/reply-query', replyToQuery)

export default router;
