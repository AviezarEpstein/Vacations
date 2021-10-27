const followersDao = require("../dao/followers-dao");
const vacationsDao = require("../dao/vacations-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
let pushService = require("../_helpers/PushService");

async function addFollow(vacationId, userId) {
  let numOfRows = await followersDao.getNumOfRows(vacationId, userId);
  if (numOfRows.length > 0) {
    throw new ServerError(ErrorType.ALREADY_FOLLOW_THIS_VACATION);
  }
  let currentNumberOfFollows = await followersDao.getCurrentNumOfFollows(
    vacationId
  );
  let numberOfFollows = currentNumberOfFollows + 1;
  await followersDao.addToFollowerTable(vacationId, userId);
  await followersDao.updateFollow(vacationId, numberOfFollows);
  vacationsSpreader();
}

async function deleteFollow(vacationId, userId) {
  let numOfRows = await followersDao.getNumOfRows(vacationId, userId);
  if (numOfRows.length == 0) {
    throw new ServerError(ErrorType.ALREADY_UNFOLLOW_THIS_VACATION);
  }
  let currentNumberOfFollows = await followersDao.getCurrentNumOfFollows(
    vacationId
  );
  let numberOfFollows = currentNumberOfFollows - 1;
  await followersDao.deleteFollowerRow(vacationId, userId);
  await followersDao.updateFollow(vacationId, numberOfFollows);
  vacationsSpreader();
}

async function getAllVacationsOrderedByfollowedVacations(userId) {
    let allVacations = await vacationsDao.getAllVacationsOrderedByfollowedVacations(userId);
    let followedVacationsResponse = await vacationsDao.getFollowedVacationsByUser(userId);
    let followedVacationsArray = new Array(followedVacationsResponse);
    for (let i = 0; i < followedVacationsResponse.length; i++) {
      followedVacationsArray.push(followedVacationsResponse[i].vacationId);
    }
    for (let i = 0; i < allVacations.length; i++) {
      if(followedVacationsArray.includes(allVacations[i].id)){
        allVacations[i].isFollowedByUser=true;
      }
      else{
        allVacations[i].isFollowedByUser=false;
      }
    }
    return allVacations;
  }

async function vacationsSpreader(){
    let idArr = await pushService.exportId();
    for (let i = 0; i < idArr.length; i++) {
      let userVacations = await getAllVacationsOrderedByfollowedVacations(idArr[i]);
      pushService.broadcast(idArr[i], userVacations);
    }
  }

module.exports = {
  addFollow,
  deleteFollow,
};
