import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser: async (parent, args, { prisma }, info) => {
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  deleteUser: async (parent, args, { prisma }, info) => {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  updateUser: async (parent, args, { prisma }, info) => {
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  createPost: async (parent, args, { prisma }, info) => {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },
  deletePost: async (parent, args, { prisma }, info) => {
    return prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  updatePost: async (parent, args, { prisma }, info) => {
    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    );
  },
  createComment: async (parent, args, { prisma }, info) => {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    );
  },
  deleteComment: (parent, args, { db, pubsub }, info) => {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const [deleteComment] = db.comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deleteComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deleteComment,
      },
    });

    return deleteComment;
  },
  updateComment: (parent, args, { db, pubsub }, info) => {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment,
      },
    });

    return comment;
  },
};

export { Mutation as default };
