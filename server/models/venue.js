import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: Number,
  avgRating: Number,
  ratingCount: Number,
  totalActivities: { type: Number, default: 0 },
  image: String,
  deferlink: String,
  fullLink: String,
  latitude: Number,
  longitude: Number,
  icon: String,
  filter_by: [String],
  timings: {
    type: String,
    required: true, 
  },
  facilities: [
    {
      name: { type: String }, 
      icon: { type: String }, 
    },
  ],
  offers: {
    type: String,  
  },
  sportsAvailable: [
    {
      id: String,
      name: String,
      icon: String,
      price: Number,
      courts: [
        {
          id: String,
          name: String,
          number: Number,
        },
      ],
    },
  ],
  location: String,
  address: {
    type: String,
    required: true,
  },
  bookings: [
    {
      courtNumber: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    },
  ],
});

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
