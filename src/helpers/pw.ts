import bcrypt from "bcryptjs";

export const comparePassword = async function (
  candidatePassword: string,
  actualPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, actualPassword);
};

export const createHashedPw = async function (
  password: string
): Promise<string> {
  return await bcrypt.hash(password, 10);
};
