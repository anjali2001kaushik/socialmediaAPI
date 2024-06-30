import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AuthRouter } from "./src/authService/routes/auth-routes.js";
import { userRouter } from "./src/userService/routes/user-route.js";
import { discussionRouter } from "./src/discussionService/routes/discussion-route.js";
import commentRouter from "./src/commentService/routes/comment-route.js";
import { dbConnectionLoad } from "./shared/database/Connection.js";
import chalk from "chalk";
dotenv.config();
const app = express();
app.use(cors())
const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/auth",AuthRouter);
app.use("/",userRouter);
app.use("/discuss",discussionRouter);
app.use("/comment",commentRouter)
const promise = dbConnectionLoad();
promise
  .then((result) => {
    console.log("DB Connection Establish");
    const server = app.listen(process.env.PORT || 1234, (err) => {
      if (err) {
        console.log(chalk.red.bold.underline("Server Crash "), err);
      } else {
        console.log(
          chalk.green.bold.underline("Server Up and Running "),
          server.address().port
        );
      }
    });
  })
  .catch((err) => {
    console.log("DB Connection Fails.", err);
  });
