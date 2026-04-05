import Game from "../models/game.js";
import Venue from "../models/venue.js";

export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({});
    
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch venues" });
  }
};

export const bookVenue = async (req, res) => {
  const { courtNumber, date, time, userId, name, game } = req.body;


  try {
    const venue = await Venue.findOne({ name: name });
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const bookingConflict =
      venue.bookings &&
      venue.bookings.find(
        (booking) =>
          String(booking.courtNumber) === String(courtNumber) &&
          booking.date === date &&
          booking.time === time,
      );
    if (bookingConflict) {
      return res.status(400).json({ message: "Slot already booked" });
    }
    // Add new booking
    venue.bookings.push({ courtNumber, date, time, user: userId, game });

    await venue.save();

    await Game.findByIdAndUpdate(game, {
      isBooked: true,
      courtNumber: courtNumber,
    });
    res.status(200).json({ message: "Booking successful", venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
