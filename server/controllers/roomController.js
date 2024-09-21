import asyncHandler from "express-async-handler";

import { Room } from "../models/RoomModel.js";

export const createRoom = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const playerUId = req.body.playerUId;

  if (!name || !playerUId) throw new Error("Name and playerUId is required!");

  const room = await Room.create({
    players: [{ name, playerUId }],
  });

  res.status(201).json(room);
});
