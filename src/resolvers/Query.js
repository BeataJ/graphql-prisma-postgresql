const Query = {
  users: (parent, args, { prisma }, info) => {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts: (parent, args, { prisma }, info) => {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
  me: () => {
    return {
      id: '12345',
      name: 'Mike',
      email: 'mail@example.ca',
    };
  },
  post: () => {
    return {
      id: '98765',
      title:
        'Missing couple rescued after frigid night spent in North Shore mountains',
      body:
        'Two overdue hikers have been found alive and well by search and rescue crews after spending a cold and wet night stranded in the North Shore. ',
      published: true,
    };
  },
};

export { Query as default };
