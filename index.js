const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

require('dotenv').config()

const app = express();
const appRouter = require("./routes/index");
const appPort =  process.env.PORT || 8080;

let server;

app.use(cors());
app.use(bodyParser.json())

app.use("/api", appRouter);

server = app.listen(appPort, () => {
  console.log(`Express server listening on port ${appPort}`);
});
