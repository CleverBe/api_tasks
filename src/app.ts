import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes";
import tasksRoutes from "./routes/tasks.routes";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/errorHandler";
import { authMiddleware } from "./middlewares/authenticaction";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ["http://localhost:3001"];

      if (!origin) {
        return callback(null, true);
      }

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

app.use("/api/users", usersRoutes);
app.use("/api/tasks", authMiddleware, tasksRoutes);
app.use("/api/", authRoutes);

app.get("/healthChecker", (_req, res) => {
  res.send("OK");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json") === "json") {
    res.json({ status: "fail", message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorMiddleware);

export default app;
