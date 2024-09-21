import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  players: [
    {
      name: { type: String, required: true },
      playerUId: { type: String, required: true },
    },
  ],
});

roomSchema.path("players").validate(function (players) {
  return players.length <= 4; //returns false if players.length > 4, it is error
}, "Room is full, maximum 4 players allowed.");

export const Room = mongoose.model("Room", roomSchema);
