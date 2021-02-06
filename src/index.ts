import express from "express";

const app = express();
const port = 3001;

app.use((req, res, next) => {
  console.log("middleware1");
  next();
});

app.use((req, res, next) => {
  console.log("middleware2");
  next();
});

app.get("/", (req, res, next) => {
  console.log("response1");
  next();
});

app.get("/", (req, res, next) => {
  console.log("response2");

  if (false) res.send("Hello World2");
  else next();
});

app.use("/", (req, res) => {
  console.log("Error");
  res.send("Error");
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
