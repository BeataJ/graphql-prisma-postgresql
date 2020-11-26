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
  deletePost: (parent, args, { db, pubsub }, info) => {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const [post] = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => comment.post !== args.id);

    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post,
        },
      });
    }

    return post;
  },
  updatePost: (parent, args, { db, pubsub }, info) => {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    const orginalPost = { ...post };

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (orginalPost.published && !post.published) {
        // delete
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: orginalPost,
          },
        });
      } else if (!orginalPost.published && post.published) {
        // create
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      }
    } else if (post.published) {
      // update
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      });
    }

    return post;
  },
  createComment: (parent, args, { db, pubsub }, info) => {
    const userExist = db.users.some((user) => user.id === args.data.author);
    const postExistPublish = db.posts.some(
      (post) => post.id === args.data.post && post.published
    );

    if (!userExist || !postExistPublish) {
      throw new Error('User not exist or post not exist');
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    });

    return comment;
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
