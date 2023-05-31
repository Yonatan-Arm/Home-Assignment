// const express = require("express");
import express from "express";
import cors from "cors";
import dataRoutes from "./api/data.routes.js";
const app = express();
app.use(express.json());
app.use(cors());

// Mounts the dataRoutes middleware to handle requests
app.use("/api", dataRoutes);

// Starts the server and listens on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
