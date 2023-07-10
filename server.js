require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = requre("cors");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const client = require("./db/client");
const app = express();

client.connect();
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/api", require("./routes"));
app.get("/test", (req, res, next) => {
  res.send("Authorization granted");
})
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  })
})

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Sereve App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
