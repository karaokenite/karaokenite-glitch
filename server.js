// Sonny: Moved from Glitch
const { readFileSync } = require("fs");
const next = require("next");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const dev = process.env.NODE_ENV !== "production";
// const express = require('express');
// const app = express();

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

  const httpsServer = createServer(
    {
      key: readFileSync("./public/ssl/key.pem", "utf-8"),
      cert: readFileSync("./public/ssl/cert.pem", "utf-8"),
    },
    app
  );

  const io = new Server(httpsServer, {
    cors: {
      origin: ["https://admin.socket.io"],
      credentials: true,
    },
  });

  instrument(io, {
    auth: false,
  });

  require("./socketController")(io);

  app.all("*", (req, res) => requestHandler(req, res));

  httpsServer.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
