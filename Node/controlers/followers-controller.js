const followersLogic = require("../logic/followers-logic");
const express = require("express");
const router = express.Router();
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role')
const jwt_decode = require('jwt-decode');

// delete follow from user list
router.delete("/deleteFollow/:id", authorize(Role.Customer), deleteFollow);
// posting follow in user list
router.post("/addFollow/:id", authorize(Role.Customer),  addFollow);

async function deleteFollow(request, response, next) {
  try {
    let vacationId = request.params.id;
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.id;
    await followersLogic.deleteFollow(vacationId, userId);
    response.json();
  } catch (error) {
    return next(error);
  }
}

async function addFollow(request, response, next) {
  try {
    let vacationId = request.params.id;
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.id;
    await followersLogic.addFollow(vacationId, userId);
    response.json();
  } catch (error) {
    return next(error);
  }
}
module.exports = router;
