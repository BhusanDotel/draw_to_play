import express from "express";
const router = express.Router();

import { createRoom, getRoomDetail } from "../controllers/roomController.js";

router.post("/", createRoom);
router.get("/:id", getRoomDetail);

export default router;
