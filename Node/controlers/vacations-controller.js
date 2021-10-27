const vacationsLogic = require("../logic/vacations-logic");
const express = require("express");
const router = express.Router();
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role')
const jwt_decode = require('jwt-decode');

// add vacation
router.post('/', authorize(Role.Admin), addVacation); // admin only
// delete vacation 
router.delete('/:id', authorize(Role.Admin), deleteVacation); // admin only
// updating vacation details
router.put('/:id', authorize(Role.Admin), updateVacation); // admin only
// get all vacations
router.get('/', getAllVacations); // public to all kind of users
// get all followed vacations by user
router.get('/allFollowedVacations', authorize(Role.Admin), getAllFollowedVacations); // admin only

async function getAllFollowedVacations(request, response, next){
  try {
    let allFollowedVacations =
      await vacationsLogic.getAllFollowedVacations();
    response.json(allFollowedVacations);
  } catch(error){
    return next(error);
  }
};

async function addVacation(request, response, next){
  try {
    let vacationData = request.body;
    await vacationsLogic.addVacation(vacationData);
    response.json();
  } catch(error){
    return next(error);
  }
};

async function deleteVacation(request, response, next){
  try {
    let vacationId = request.params.id;
    await vacationsLogic.deleteVacation(vacationId);
    response.json();
  } catch(error){
    return next(error);
  }
};

  // updating vacation details
async function updateVacation(request, response, next) {
  try {
    let id = request.params.id;
    let updatedVacationData = request.body;
    await vacationsLogic.updateVacation(updatedVacationData, id);
    response.json();
  } catch(error){
    return next(error);
  }
};

// get all vacations - order by number of follwers
async function getAllVacations(request, response, next){
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.id;
    let allVacations =
      await vacationsLogic.getAllVacationsOrderedByfollowedVacations(userId);
    response.json(allVacations);
  } catch(error){
    return next(error);
  }
};

  module.exports = router;
