import { prisma } from "../database";
import { comparePassword, hashPassword } from "../libs/bcrypt";
import { signToken } from "../libs/jwt";
import { CustomError } from "../types";

export class AuthService {
  static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new CustomError("Invalid credentials", 401);
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      throw new CustomError("Invalid credentials", 401);
    }

    const token = signToken({ id: user.id, username: user.username });

    return { id: user.id, username: user.username, token };
  }

  static async register({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const userExists = await prisma.user.findUnique({ where: { username } });

    if (userExists) {
      throw new CustomError("User already exists", 409);
    }

    const hashedPassword = await hashPassword(password);

    const user = prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return user;
  }
}
