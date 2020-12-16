"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUserId = function getUserId(request) {
  var requieAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    var token = header.replace('Bearer ', '');

    var decoded = _jsonwebtoken["default"].verify(token, 'thisisasecret');

    return decoded.userId;
  }

  if (requieAuth) {
    throw new Error('Authentitation required!');
  }

  return null;
};

exports["default"] = getUserId;