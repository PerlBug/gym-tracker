import { createUser, deleteUser, updateUser, registerUser, loginUser } from "../controllers/UserController"

/**
 * @description holds user mutations
 */

export const UserMutation = {
  createUser: {
    resolve: async (parent, args, context, info) => {
      return await createUser(context.dbConn, args.input);
    },
  },
  updateUser: {
    resolve: async (parent, args, context, info) => {
      return await updateUser(context.dbConn, args.input);
    },
  },
  registerUser: {
    resolve: async (parent, args, context, info) => {
      return await registerUser(context.dbConn, args.input);
    },
  },
  loginUser: {
    resolve: async (parent, args, context, info) => {
      return await loginUser(context.dbConn, args.input);
    },
  },
  deleteUser: {
    resolve: async (parent, args, context, info) => {
      return await deleteUser(context.dbConn, args.id);
    },
  },
}