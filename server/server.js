import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

import connectDB from "./db.js";
import { initSocket } from "./socketService.js";
import { API_LOGGER } from "./middleware/apiLogger.js";

import canvasRoute from "./routes/canvasRoute.js";
import roomRoute from "./routes/roomRoute.js";

import { ERROR_HANDLER } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const server = http.createServer(app);

initSocket(server);

app.use(API_LOGGER);

app.use("/api/canvas", canvasRoute);
app.use("/api/room", roomRoute);

app.use(ERROR_HANDLER);

server.listen(3000, () => {
  console.log("App listening on port 3000!");
});
