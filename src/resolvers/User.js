import getUserId from '../utils/getUserId';

const User = {
  email: (parent, args, { request }, info) => {
    const userId = getUserId(request, false);

    console.log(parent);
  },
};

export { User as default };
