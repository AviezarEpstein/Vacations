let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addUser(registrationData) {
  let sql = `INSERT INTO Users (user_name, password, first_name, last_name, user_type)
    VALUES (?,?,?,?,?)`;

  let parameters = [
    registrationData.userName,
    registrationData.password,
    registrationData.firstName,
    registrationData.lastName,
    registrationData.userType,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(registrationData),
      e
    );
  }
}

async function isUserExistById(userId) {
  let sql = "select id from users WHERE id = ?";
  let parameters = [userId];

  try {
    let res = await connection.executeWithParameters(sql, parameters);
    console.log(res);
    if (res.length > 0) {
      return true;
    }
    return false;
  } catch (e) {
    let userId = "User ID: " + userId;
    throw new ServerError(ErrorType.GENERAL_ERROR, userId, e);
  }
}

async function editUserDetails(userData, userId){
  let sql = 'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?';
  let parameters = [userData.firstName, userData.lastName, userId];
  try{
    await connection.executeWithParameters(sql, parameters);
  }catch(e){
    let userData =
      "User data: " + JSON.stringify(userData) + ", " + "User ID: " + userId;
    throw new ServerError(ErrorType.GENERAL_ERROR, userData, e); 
  }
}

async function isUserExistByName(name) {
  let sql = "select user_name from users WHERE user_name = ?";
  let parameters = [name];
  let res = await connection.executeWithParameters(sql, parameters);
  console.log(res);
  if (res.length > 0) {
    console.log("Name already exists");
    return true;
  }
  return false;
}


async function login(user) {
  // UNCOMMENT IN ORDER TO SEE A GENERAL ERROR EXAMPLE
  // let sql = "SELECT * FROM users where username =? and password =?";
  let sql =
  "SELECT id as userId, user_type as userType FROM users where user_name =? and password =?";
  
  let parameters = [user.userName, user.password];
  
  let usersLoginResult;
  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
    // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
  }
  // A functional (!) issue which means - the userName + password do not match
  if (usersLoginResult == null || usersLoginResult.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  console.log(usersLoginResult[0]);
  return usersLoginResult[0];
}

async function isOldPasswordValid(oldPassword, userId){
  let sql = "select password from users WHERE password = ? and id = ?";
  let parameters = [oldPassword, userId];
  try{
    let res = await connection.executeWithParameters(sql, parameters);
    if (res.length > 0) {
      return true;
    }else{
      return false;
    }
  }catch(e){
    let userData =
    "Old password: " + JSON.stringify(oldPassword) + ", " + "User ID: " + userId;
  throw new ServerError(ErrorType.GENERAL_ERROR, userData, e); 
  }
}

async function changePassword(newPassword, userId){
  let sql = 'UPDATE users SET password = ? WHERE id = ?';
  let parameters = [newPassword, userId];
  try{
    await connection.executeWithParameters(sql, parameters);
  }catch(e){
    let userData =
      "New password: " + JSON.stringify(userData) + ", " + "User ID: " + userId;
    throw new ServerError(ErrorType.GENERAL_ERROR, userData, e); 
  }
}

module.exports = {
  addUser,
  isUserExistByName,
  login,
  isUserExistById,
  editUserDetails,
  isOldPasswordValid,
  changePassword
};
