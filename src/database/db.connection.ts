import mongoose from "mongoose";

export function startDBConnection(): mongoose.Connection {
  const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/cometdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  conn.on("error", console.error.bind(console, "connection error:"));
  conn.once("open", function () {
    console.log("Connected database");
  });

  return conn;
}
