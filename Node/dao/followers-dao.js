let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function getNumOfRows(id, userId) {
  let sql = `select * FROM followers WHERE vacation_id = ? and follower_id = ?`;
  let parameters = [id, userId]
  try {
    let numOfRows = await connection.executeWithParameters(sql, parameters);
    return numOfRows;
  } catch (error) {
    let data = { id, userId };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, error);
  }
}

async function getCurrentNumOfFollows(id) {
  let sql = `select number_of_followers from vacation WHERE id = ?`;
  let parameters = [id];
  try {
    let currentNumberOfFollows = await connection.executeWithParameters(
      sql,
      parameters
    );
    let res = currentNumberOfFollows[0].number_of_followers;
    return res;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, id, error);
  }
}

async function addToFollowerTable(id, userId) {
  let sql = `INSERT INTO followers SET follower_id = ?, vacation_id = ?`;
  let parameters = [userId, id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    let data = { userId, id };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, error);
  }
}

async function deleteFollowerRow(id, userId) {
  let sql = `DELETE FROM followers WHERE follower_id = ? and vacation_id = ?`;
  let parameters = [userId, id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    let data = { id, userId };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, error);
  }
}

async function updateFollow(id, numberOfFollows) {
  let sql;
  sql = `UPDATE vacation SET number_of_followers = ? WHERE id = ?`;
  let parameters = [numberOfFollows, id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    let data = { id, numberOfFollows };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, error);
  }
}

module.exports = {
  getCurrentNumOfFollows,
  updateFollow,
  getNumOfRows,
  addToFollowerTable,
  deleteFollowerRow,
};
