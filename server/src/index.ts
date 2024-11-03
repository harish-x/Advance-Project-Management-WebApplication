import exppress, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middlewares/error";
import authRouter from "./routers/AuthRouter";
import projectRouter from "./routers/ProjectRouter";
import taskRouter from "./routers/TaskRouter";
import searchRoute from "./routers/SearchRoutes";
dotenv.config();
const app = exppress();

app.use(exppress.json());
app.use(cookieParser());

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use("/api/auth/", authRouter);
app.use("/api/project/", projectRouter);
app.use("/api/task/", taskRouter);
app.use("/search/", searchRoute);

const port = process.env.PORT;
app.use(errorHandler);
app.listen(port, () => {
  console.log("app is running on port " + port);
});
