const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const api = require("./routes/api/api");
const middlewares = require("./middlewares");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(__dirname + "/public/"));
app.get(/.*!/, (req, res) => res.sendFile(__dirname + "./public/index.html"));
app.use("/api", api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
