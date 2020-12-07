import jwt from 'jsonwebtoken';

const getUserId = (request, requieAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisisasecret');

    return decoded.userId;
  }

  if (requieAuth) {
    throw new Error('Authentitation required!');
  }

  return null;
};

export { getUserId as default };
