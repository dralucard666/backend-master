import { Resolvers } from "./__generated__/resolvers-types.js";
import { GetSubCurrentTime } from "./resolvers/current-time.js";
import { CreateUser, GetAllUsers, Login } from "./resolvers/user.js";

export const resolvers: Resolvers = {
  Mutation: {
    createUser: CreateUser,
  },
  Query: {
    login: Login,
    getAllUsers: GetAllUsers,
  },
  Subscription: {
    timeSub: GetSubCurrentTime,
  },
};
