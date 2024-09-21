import asyncHandler from "express-async-handler";

import { getSocketIo } from "../socketService.js";
import { Room } from "../models/RoomModel.js";

export const createRoom = asyncHandler(async (req, res) => {
  //   const io = getSocketIo();
  //   io.emit("roomCreated", { message:"room created"});

  const room = await Room.create({
    players: [],
  });

  res.status(201).json(room);
});
