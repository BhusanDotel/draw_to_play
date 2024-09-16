import express from "express";
const router = express.Router();

import { syncCanvas } from "../controller/canvasController.js";

router.post("/sync-canvas", syncCanvas);

export default router;
