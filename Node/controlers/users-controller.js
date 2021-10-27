const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');

router.post('/', register);     // public
router.post('/login', login); // public to all kind of users
router.put('/editUser', updateUserDetails); // public to all kind of users
router.put('/editUserDetails', editUserDetails); // public to all kind of users
router.put('/editPassword', editPassword); // public to all kind of users


async function updateUserDetails(request, response, next){
  try{
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let userData = request.body;
    await usersLogic.updateUserDetails(userData, userId);
    response.json();
  } 
  catch(error){
    return next(error);
  }
};

async function register(request, response, next){
  try{
    let registrationData = request.body;
    await usersLogic.addUser(registrationData);
    response.json();
  } 
  catch(error){
    return next(error);
  }
};

async function login(request, response, next){
  
  // Extracting the JSON from the packet's BODY
  let user = request.body;
  try {
    let successfullLoginData = await usersLogic.login(user);
    response.json(successfullLoginData);
  }
  catch (error) {
    console.log(error);
    return next(error);
  }
};

async function editUserDetails(request, response , next){
  try{
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let userData = request.body;
    await usersLogic.editUserDetails(userData, userId);
    response.json();
  }catch(error){
    console.log(error);
    return next(error);
  }
}

async function editPassword(request, response , next){
  try{
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let passwordData = request.body;
    await usersLogic.editPassword(passwordData, userId);
    response.json();
  }catch(error){
    return next(error);
  }
}
module.exports = router;
