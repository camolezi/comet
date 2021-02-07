import express from "express";

const app = express();

app.get("/version", (req, res) => {
  res.json({ version: "1.0" });
});

export default app;
