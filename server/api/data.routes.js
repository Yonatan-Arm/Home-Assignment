import { Router } from "express";
import cors from "cors";
import { getData, getDataById } from "./data.controller.js";
const router = Router();

// Route to handle GET requests for the root endpoint
// Calls the getData function to fetch and return data
router.get("/", getData);
router.post("/:sortDataById", getDataById);

export default router;
