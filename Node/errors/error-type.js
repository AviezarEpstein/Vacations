let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  EMPTY_INPUT: {
    id: 3,
    httpCode: 602,
    message: "All fields are required!",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 4,
    httpCode: 401,
    message: "Login failed, invalid user name or password",
    isShowStackTrace: false,
  },
  DESCRIPTION_TOO_LONG: {
    id: 5,
    httpCode: 603,
    message: "Description field can not be more then 200 charachters",
    isShowStackTrace: false,
  },
  LOCATION_TOO_LONG: {
    id: 6,
    httpCode: 603,
    message: "Location field can not be more then 45 charachters",
    isShowStackTrace: false,
  },
  VACATION_DOSE_NOT_EXIST: {
    id: 7,
    httpCode: 605,
    message: "Vacation id dose not exist",
    isShowStackTrace: true,
  },
  ALREADY_FOLLOW_THIS_VACATION: {
    id: 8,
    httpCode: 606,
    message: "You already follow this vacation",
    isShowStackTrace: true,
  },
  ALREADY_UNFOLLOW_THIS_VACATION: {
    id: 8,
    httpCode: 606,
    message: "You already follow this vacation",
    isShowStackTrace: true,
  },
  START_DATE_IS_FUTURE_TO_END_DATE: {
    id: 9,
    httpCode: 607,
    message: "End date must be future or even to the start date",
    isShowStackTrace: false,
  },
  PAST_DATE: {
    id: 9,
    httpCode: 608,
    message: "Date must be a future date",
    isShowStackTrace: false,
  },
  TOO_LONG_TEXT: {
    id: 10,
    httpCode: 609,
    message: "One or more of the inputs is too long.",
    isShowStackTrace: false,
  },
  INCORRECT_PASSWORD: {
    id: 10,
    httpCode: 610,
    message: "Old password is incorrect",
    isShowStackTrace: false,
  }
};

module.exports = ErrorType;
