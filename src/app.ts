import express from "express";

const app = express();

app.get("/version", (req, res) => {
  res.json({ version: 1 });
});

export default app;