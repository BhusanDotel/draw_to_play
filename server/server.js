import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

import { initSocket } from "./socketService.js";
import canvasRoute from "./routes/canvasRoute.js";
import connectDB from "./db.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const server = http.createServer(app);

initSocket(server);

app.use("/api", canvasRoute);

server.listen(3000, () => {
  console.log("App listening on port 3000!");
});
