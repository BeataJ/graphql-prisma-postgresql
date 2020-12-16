"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Query = {
  users: function users(parent, args, _ref, info) {
    var prisma = _ref.prisma;
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts: function posts(parent, args, _ref2, info) {
    var prisma = _ref2.prisma;
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true
      }
    };

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  myPosts: function myPosts(parent, args, _ref3, info) {
    var prisma = _ref3.prisma,
        request = _ref3.request;
    var userId = (0, _getUserId["default"])(request);
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        author: {
          id: userId
        }
      }
    };

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments: function comments(parent, args, _ref4, info) {
    var prisma = _ref4.prisma;
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    return prisma.query.comments(opArgs, info);
  },
  me: function () {
    var _me = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref5, info) {
      var prisma, request, userId, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              prisma = _ref5.prisma, request = _ref5.request;
              userId = (0, _getUserId["default"])(request);
              _context.next = 4;
              return prisma.query.user({
                where: {
                  id: userId
                }
              }, info);

            case 4:
              user = _context.sent;
              return _context.abrupt("return", user);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function me(_x, _x2, _x3, _x4) {
      return _me.apply(this, arguments);
    }

    return me;
  }(),
  post: function () {
    var _post = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref6, info) {
      var prisma, request, urserId, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              prisma = _ref6.prisma, request = _ref6.request;
              urserId = (0, _getUserId["default"])(request, false);
              _context2.next = 4;
              return prisma.query.posts({
                where: {
                  id: args.id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: urserId
                    }
                  }]
                }
              }, info);

            case 4:
              posts = _context2.sent;

              if (!(posts.length === 0)) {
                _context2.next = 7;
                break;
              }

              throw new Error('Post not found');

            case 7:
              return _context2.abrupt("return", posts[0]);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function post(_x5, _x6, _x7, _x8) {
      return _post.apply(this, arguments);
    }

    return post;
  }()
};
exports["default"] = Query;