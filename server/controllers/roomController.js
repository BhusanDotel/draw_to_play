import asyncHandler from "express-async-handler";

import { Room } from "../models/RoomModel.js";

//POST api/room
export const createRoom = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const playerUId = req.body.playerUId;

  if (!name || !playerUId) throw new Error("Name and playerUId is required!");

  const room = await Room.create({
    players: [{ name, playerUId }],
  });

  res.status(201).json(room);
});

//GET api/room/:id
export const getRoomDetail = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) throw new Error("Room not found!");

  res.status(201).json(room);
});
