// Sonny: Moved from Glitch
const fs = require("fs");
// const express = require('express');
// const app = express();

const httpolyglot = require("httpolyglot");
const https = require("https");

const options = {
  key: fs.readFileSync("./public/ssl/key.pem", "utf-8"),
  cert: fs.readFileSync("./public/ssl/cert.pem", "utf-8"),
};

// Get port or default to 8080
const port = process.env.PORT || 8080;

const express = require("express");
const app = express();

// make all the files in 'public' available
app.use(express.static("public"));

// const webServer = http.createServer(app);
// const io = require('socket.io')(webServer);

const httpsServer = httpolyglot.createServer(options, app);
const io = require("socket.io")(httpsServer);

require("./socketController")(io);

httpsServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
