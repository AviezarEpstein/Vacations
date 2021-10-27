const express = require("express");
const server = express();
const usersController = require("./controlers/users-controller");
const vacationsController = require("./controlers/vacations-controller");
const followersController = require("./controlers/followers-controller");

const errorHendler = require("./errors/error-handler");

const cors = require("cors");
// server.use(cors({ origin: "http://localhost:3000" }));
// server.use(cors({ origin: "http://localhost:4200" }));
server.use(cors({ origin: "*" }));


const loginFilter = require('./login-filter');

// Middlewares init
server.use(loginFilter());

server.use(express.json());
server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followers", followersController);

server.use(errorHendler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));

// module.exports = authenticateJwtRequestToken
