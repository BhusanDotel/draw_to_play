import asyncHandler from "express-async-handler";
import { getSocketIo } from "../socketService.js";

export const syncCanvas = asyncHandler((req, res) => {
  if (!req?.body) throw new Error("No data sent");
  const io = getSocketIo();
  io.emit("syncData", { blob: req?.body?.savedData });
  res.status(200).json("Data sent successfully");
});
