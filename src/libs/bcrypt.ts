import bcrypt from "bcrypt";
import { config } from "../config";

export const hashPassword = async (text: string) => {
  const hashedText = await bcrypt.hash(text, config.SALTROUNDS);

  return hashedText;
};

export const comparePassword = async (text: string, hashedText: string) => {
  const isMatch = await bcrypt.compare(text, hashedText);

  return isMatch;
};
