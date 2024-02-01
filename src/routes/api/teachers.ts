import express from "express";

const teacher = express.Router();

teacher.get("/", (req, res) => {
  res.send("Teachers route");
});

export default teacher;
