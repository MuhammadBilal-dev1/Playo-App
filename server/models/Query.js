import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  reply: { type: String, default: null }, // Nayi field
  repliedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Query = mongoose.model("Query", querySchema);

export default Query;
