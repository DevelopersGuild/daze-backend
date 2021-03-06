'use strict';

var validator = require('validator');

var USERNAME_MIN_LEN    = 3;
var USERNAME_MAX_LEN    = 20;
var EMAIL_MAX_LEN       = 254;
var PASSWORD_MIN_LEN    = 5;
var PASSWORD_MAX_LEN    = 512;
var TITLE_MAX_LEN       = 140;
var DESCRIPTION_MAX_LEN = 140;
var LOCATION_MAX_LEN    = 50;

function validateToken(token) {
  var tokenRegexp = /^[A-Za-z0-9+\/]{342}==$/;

  if (!token) {
    return new Error('You are not logged in.');
  }
  if (!tokenRegexp.test(token)) {
    return new Error('That token is invalid.');
  }
  return null;
}


function validateUsername(username) {
  var usernameRegexp = /^[a-zA-Z0-9-_]+$/;

  if (!username) {
    return new Error('Username field cannot be empty.');
  }

  if (!validator.isLength(username, USERNAME_MIN_LEN)) {
    return new Error('Username must be at least ' +
      USERNAME_MIN_LEN + ' characters.');
  }

  if (validator.isLength(username, USERNAME_MAX_LEN + 1)) {
    return new Error('Username field cannot be more than ' +
      USERNAME_MAX_LEN + ' characters.');
  }


  if (!usernameRegexp.test(username)) {
    return new Error('Username can only contain letters, ' +
                    'numbers, dashes, and underscores.');
  }

  return null;
}

function validateEmail(email) {

  if (!email) {
    return new Error('Email field cannot be empty.');
  }

  if (!validator.isEmail(email)) {
    return new Error('That is not a valid email.');
  }

  if (validator.isLength(email, EMAIL_MAX_LEN + 1)) {
    return new Error('Email is too long.');
  }

  return null;

}

function validatePassword(password) {
  if (!password) {
    return new Error('Password field cannot be empty.');
  }

  if (!validator.isLength(password, PASSWORD_MIN_LEN)) {
    return new Error('Password must be at least ' +
      PASSWORD_MIN_LEN + ' characters.');
  }

  if (validator.isLength(password, PASSWORD_MAX_LEN + 1)) {
    return new Error('Password is too long.');
  }

  return null;

}

function validateUsernameEmail(usernameEmail) {

  if (!usernameEmail) {
    return new Error('Username/Email field cannot be empty.');
  }

  // Whichever is greater.
  var maxLen = Math.max(EMAIL_MAX_LEN, USERNAME_MAX_LEN);
  if (validator.isLength(usernameEmail, maxLen + 1)) {

    return new Error('Username/Email is too long.');
  }

  return null;
}

function validateTitle(title) {

  if (!title) {
    return new Error('Title field cannot be empty.');
  }

  if (validator.isLength(title, TITLE_MAX_LEN + 1)) {

    return new Error('Title is too long.');
  }

  return null;
}

function validateDescription(description) {

  if (validator.isLength(description, DESCRIPTION_MAX_LEN + 1)) {

    return new Error('Description is too long.');
  }

  return null;
}

function validateLocation(location) {

  if (!location) {
    return new Error('Location field cannot be empty.');
  }

  if (validator.isLength(location, LOCATION_MAX_LEN + 1)) {

    return new Error('Location is too long.');
  }

  return null;
}

function validateCoordinate(coordinate) {

  if (!coordinate) {
    return new Error('Invalid Marker Coordinates.');
  }

  if (typeof coordinate !== 'number') {
    return new Error ('Invalid Marker Coordinates.');
  }

  return null;
}

function validateType(type) {

  if (!type && type !== 0) {
    return new Error('Type field cannot be empty.');
  }

  if (typeof type !== 'number') {
    return new Error ('Invalid type.');
  }

  return null;
}

function validateTtl(ttl) {

  if (!ttl) {
    return new Error('Invalid date/time specified.');
  }

  if (typeof ttl !== 'number') {
    return new Error ('Invalid date/time specified.');
  }

  return null;
}

function sendError(res, err) {
  if (err) {
    res.send({
      code: 400,
      message: err.message
    });
    return true;
  } else {
    return false;
  }
}

var ShallowValidateModel = {
  username      : validateUsername,
  email         : validateEmail,
  password      : validatePassword,
  usernameEmail : validateUsernameEmail,
  token         : validateToken,
  title         : validateTitle,
  description   : validateDescription,
  location      : validateLocation,
  coordinate    : validateCoordinate,
  type          : validateType,
  ttl           : validateTtl,
  sendError     : sendError
};

module.exports = ShallowValidateModel;
