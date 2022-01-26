// Sonny: Moved from Glitch
const fs = require("fs");
const next = require("next");
const express = require("express");
const httpolyglot = require("httpolyglot");

const dev = process.env.NODE_ENV !== "production";
// const express = require('express');
// const app = express();

const options = {
  key: fs.readFileSync("./public/ssl/key.pem", "utf-8"),
  cert: fs.readFileSync("./public/ssl/cert.pem", "utf-8"),
};

const nextApp = next({ dev });
const requestHandler = nextApp.getRequestHandler();

// Get port or default to 8080
const port = process.env.PORT || 8080;

nextApp.prepare().then(async () => {
  const app = express();

  // make all the files in 'public' available
  app.use(express.static("public/styles"));

  // const webServer = http.createServer(app);
  // const io = require('socket.io')(webServer);

  const httpsServer = httpolyglot.createServer(options, app);
  const io = require("socket.io")(httpsServer);

  require("./socketController")(io);

  app.all("*", (req, res) => requestHandler(req, res));

  httpsServer.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
