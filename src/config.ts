const requiredEnvVariables = ["PORT", "JWT_SECRET", "DATABASE_URL"];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const config = {
  PORT: process.env.PORT,
  SALTROUNDS: process.env.NODE_ENV === "PRODUCTION" ? 10 : 4,
  JWT_SECRET: process.env.JWT_SECRET as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_EXPIRES_IN: "1h",
};
