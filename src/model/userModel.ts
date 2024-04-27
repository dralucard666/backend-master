import mongoose, { Document, Schema, model } from "mongoose";
import { CreateUserInput, User } from "../__generated__/resolvers-types";
import { createHashedPw } from "../helpers/pw";

interface UserDocument
  extends Omit<User & { hashedpassword: string }, "id">,
    Document {}

export const UserModel = model<UserDocument>(
  "User",
  new Schema<UserDocument>({
    username: { type: String, required: true },
    hashedpassword: { type: String, required: true },
  })
);

export const userModelCreateUser = async (input: CreateUserInput) => {
  const password = input.password;
  const hashedPassword = await createHashedPw(password);

  const newUser = await UserModel.create({
    ...input,
    password: hashedPassword,
  });
  const returnUser = newUser.toObject({ virtuals: true });
  delete returnUser.hashedpassword;
  return newUser.toObject({ virtuals: true }) as User;
};
