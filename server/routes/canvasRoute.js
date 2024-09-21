import express from "express";
const router = express.Router();

import { syncCanvas } from "../controllers/canvasController.js";

router.post("/sync", syncCanvas);

export default router;
