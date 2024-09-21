import express from "express";
const router = express.Router();

import { syncCanvas } from "../controllers/canvasController.js";

router.post("/sync-canvas", syncCanvas);

export default router;
