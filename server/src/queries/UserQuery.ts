import { UnauthorizedError } from "type-graphql";
import { getAllUsers, getUser } from "../controllers/UserController";
import { getUserIdFromContext } from "../utils/auth";

/**
 * @description holds user queries
 */

export const UserQuery = {
  users: {
    resolve: async (parent, args, context, info) => {
      if(!getUserIdFromContext(context)) throw new UnauthorizedError();
      return await getAllUsers(context.dbConn)
    },
  },
  user: {  
    resolve: async(parent, args, context, info) => {
      if(!getUserIdFromContext(context)) throw new UnauthorizedError();
      return await getUser(context.dbConn, args.id)
    },
  }
}