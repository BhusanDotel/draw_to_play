import asyncHandler from "express-async-handler";
import { getSocketIo } from "../socketService.js";

export const syncCanvas = asyncHandler((req, res) => {
  const io = getSocketIo();
  io.emit("syncData", { blob: req?.body?.body });
  res.status(200).json("Canvas should sync successfully");
});
