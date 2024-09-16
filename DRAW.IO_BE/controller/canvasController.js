import asyncHandler from "express-async-handler";
import { getSocketIo } from "../socketService.js";

export const syncCanvas = asyncHandler((req, res) => {
  if (!req?.body) return;

  const io = getSocketIo();
  io.emit("savedData", { message: req?.body?.savedData });

  res.status(200).json("Data sent successfully");
});
