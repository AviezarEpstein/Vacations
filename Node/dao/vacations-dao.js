let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addVacation(vacationData) {
  let sql = `INSERT INTO vacation (description, location, image, start_date, end_date, price)
    VALUES (?,?,?,?,?,?)`;

  let parameters = [
    vacationData.description,
    vacationData.location,
    vacationData.image,
    vacationData.startDate,
    vacationData.endDate,
    vacationData.price,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, vacationData, error);
  }
}

async function isvalidVacation(vacationId) {
  let sql = "select id from vacation where id = ?";
  let parameters = [vacationId];
  try {
    let vacationIdResult = await connection.executeWithParameters(
      sql,
      parameters
    );
    if (vacationIdResult[0].id == vacationId) {
      return true;
    }
    return false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, vacationId, error);
  }
}

async function getFollowedVacationsByUser(userId) {
  let sql = `SELECT vacation_id as vacationId FROM followers WHERE follower_id = ?`;
  let parameters = [userId];

  try {
    let followedVacations = await connection.executeWithParameters(
      sql,
      parameters
    );
    return followedVacations;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, userId, e);
  }
}

async function getAllFollowedVacations() {
  let sql = `SELECT id, number_of_followers as numOfFollowers FROM vacation WHERE number_of_followers > 0`;
  try {
    let followedVacations = await connection.execute(sql);
    return followedVacations;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function deleteVacation(vacationId) {
  let sql = `DELETE FROM vacation WHERE id = ?`;
  let parameters = [vacationId];

  await connection.executeWithParameters(sql, parameters);
}

async function updateVacation(updatedVacationData, id) {
  let sql = `UPDATE vacation SET description = ?, location = ?, image = ?, start_date = ?, end_date = ?, price = ? WHERE id = ?`;

  let parameters = [
    updatedVacationData.description,
    updatedVacationData.location,
    updatedVacationData.image,
    updatedVacationData.startDate,
    updatedVacationData.endDate,
    updatedVacationData.price,
    id,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    let data = { vacationData: updatedVacationData, id: id };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, error);
  }
}

async function getAllVacationsOrderedByfollowedVacations(userId) {
  let sql = `select v.id, v.description, v.location, v.image, DATE_FORMAT(v.start_date, "%Y-%m-%d") AS 'startDate', DATE_FORMAT(v.end_date, "%Y-%m-%d") as 'endDate', v.number_of_followers as numOfFollowers, v.price from vacation v left join 
  (select * from followers f where f.follower_id = ?) flv on v.id = flv.vacation_id
  order by flv.vacation_id desc`;
  let parameters = [userId];
  try {
    let allVacations = await connection.executeWithParameters(sql, parameters);
    return allVacations;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, userId, error);
  }
}

module.exports = {
  addVacation,
  updateVacation,
  getAllVacationsOrderedByfollowedVacations,
  deleteVacation,
  getFollowedVacationsByUser,
  getAllFollowedVacations,
  isvalidVacation,
};
