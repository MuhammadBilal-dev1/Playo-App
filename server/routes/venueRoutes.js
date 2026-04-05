import express from "express";
import { getVenues, bookVenue } from "../controllers/venueController.js";

const router = express.Router();
router.get("/", getVenues);
router.post("/book", bookVenue);

export default router;