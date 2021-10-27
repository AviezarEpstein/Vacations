const vacationsDao = require("../dao/vacations-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
let pushService = require("../_helpers/PushService");

async function getFollowedVacationsByUser(userId){
  let followedVacations = await vacationsDao.getFollowedVacationsByUser(userId);
  return followedVacations;
}

async function getAllFollowedVacations(){
  let allFollowedVacations = await vacationsDao.getAllFollowedVacations();
  return allFollowedVacations;
}

async function addVacation(vacationData) {
  vaidateVacationDetails(vacationData);
  await vacationsDao.addVacation(vacationData);
  vacationsSpreader();
}

async function vacationsSpreader(){
  let idArr = await pushService.exportId();
  for (let i = 0; i < idArr.length; i++) {
    let userVacations = await getAllVacationsOrderedByfollowedVacations(idArr[i]);
    pushService.broadcast(idArr[i], userVacations);
  }
}

async function deleteVacation(vacationId) {
  if(!await vacationsDao.isvalidVacation(vacationId)){
    throw new ServerError(ErrorType.VACATION_DOSE_NOT_EXIST);
  }  
  await vacationsDao.deleteFromFollowersTable(vacationId);
  await vacationsDao.deleteVacation(vacationId);
  vacationsSpreader();
}

async function updateVacation(updatedVacationData, id) {
  vaidateVacationDetails(updatedVacationData);
  await vacationsDao.updateVacation(updatedVacationData, id);
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

function vaidateVacationDetails(vacationData) {
  if (isEmptyField(vacationData.description)) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (isEmptyField(vacationData.location)) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (isEmptyField(vacationData.image)) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (isEmptyField(vacationData.startDate)) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (isEmptyField(vacationData.endDate)) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (isEmptyField(vacationData.price)) {
    throw new ServerError(ErrorType.EMPTY_INPUT);
  }

  if (vacationData.description.length > 200){
    throw new ServerError(ErrorType.DESCRIPTION_TOO_LONG);
  }

  if (vacationData.location.length > 45){
    throw new ServerError(ErrorType.LOCATION_TOO_LONG);
  }

  if(vacationData.endDate < vacationData.startDate){
    throw new ServerError(ErrorType.START_DATE_IS_FUTURE_TO_END_DATE);
  }

  if(vacationData.startDate < disablePastDate()){
    throw new ServerError(ErrorType.PAST_DATE);
  }

  if(vacationData.endDate < disablePastDate()){
    throw new ServerError(ErrorType.PAST_DATE);
  }
}

const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() + 1).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

function isEmptyField(field) {
  if (field == "" || field == null) {
    return true;
  }
}

module.exports = {
  addVacation,
  updateVacation,
  getAllVacationsOrderedByfollowedVacations,
  deleteVacation,
  getAllFollowedVacations,
};
