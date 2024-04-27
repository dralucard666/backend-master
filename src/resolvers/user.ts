import {
  MutationCreateUserArgs,
  QueryLoginArgs,
  User,
} from "../__generated__/resolvers-types";
import { authPayload, generateToken } from "../helpers/auth";
import { comparePassword } from "../helpers/pw";
import { UserModel, userModelCreateUser } from "../model/userModel";

const users: User[] = [];

export const CreateUser = async (
  parent: any,
  args: MutationCreateUserArgs,
  context: { user: authPayload }
) => {
  //  const existingUser = await UserModel.findOne({
  //    username: args.input.username,
  //  });
  //  if (existingUser) {
  //    throw new Error(
  //      `User with username ${args.input.username} already exists.`
  //    );
  //  }
  //  const user = await userModelCreateUser(args.input);
  //  return user;
  const newUser = { username: args.input.username, id: "" + users.length };
  users.push(newUser);
  return newUser;
};

export const GetAllUsers = async (
  parent: any,
  args: MutationCreateUserArgs,
  context: { user: authPayload }
) => {
  return users;
};

export const Login = async (parent: any, args: QueryLoginArgs) => {
  const { username, password } = args.input;
  if (!username || !password) {
    throw new Error(`Username or Password not set.`);
  }
  const possibleUser = await UserModel.findOne({ username });

  if (!possibleUser) {
    throw new Error(`Login not successful.`);
  }

  const user = possibleUser.toObject();

  const passwordMatch = await comparePassword(password, user.hashedpassword);
  if (!passwordMatch) {
    throw new Error(`Login not successful.`);
  }

  const token = generateToken({
    userId: user.id,
    username: user.username,
  });

  return {
    token: token,
  };
};
