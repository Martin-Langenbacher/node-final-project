import express from "express";

const teacher = express.Router();

teacher.get("/", (req, res) => {
  res.send("Teacher route");
});

export default teacher;
