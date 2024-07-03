import { UserStatus } from "@prisma/client";
import { prisma } from "../database";
import { hashPassword } from "../libs/bcrypt";
import { CustomError } from "../types";

export class UsersService {
  static async getAllUsers() {
    const users = prisma.user.findMany();

    return users;
  }

  static async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user;
  }

  static async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  static async createUser({
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

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return user;
  }

  static async updateUser({
    id,
    username,
    password,
  }: {
    id: number;
    username: string;
    password: string;
  }) {
    const user = prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const userExists = await prisma.user.findUnique({
      where: { username, NOT: { id } },
    });

    if (userExists) {
      throw new CustomError("Username already exists", 409);
    }

    if (password) {
      const hashedPassword = await hashPassword(password);

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          username,
          password: hashedPassword,
        },
      });

      return updatedUser;
    } else {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          username,
        },
      });

      return updatedUser;
    }
  }

  static async deleteUser(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    await prisma.user.delete({
      where: { id },
    });
  }

  static async updateUserStatus({
    id,
    status,
  }: {
    id: number;
    status: UserStatus;
  }) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        status,
      },
    });

    return updatedUser;
  }

  static async getUserTasks(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const tasks = await prisma.task.findMany({
      where: { userId: id },
      select: { name: true, done: true },
    });

    return { id, username: user.username, tasks };
  }
}
