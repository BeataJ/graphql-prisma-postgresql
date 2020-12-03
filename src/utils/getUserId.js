import jwt from 'jsonwebtoken';

const getUserId = (request, requieAuth = true) => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisisasecret');

    return decoded.userId;
  }

  if (requieAuth) {
    throw new Error('Authentitation required!');
  }
};

export { getUserId as default };
