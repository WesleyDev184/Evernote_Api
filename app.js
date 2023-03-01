import express, { json, urlencoded } from "express";
import { join } from "path";
import logger from "morgan";
import "./config/database";
import cors from "cors";

import usersRouter from "./app/routes/users";
import notesRouter from "./app/routes/notes";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(join(__dirname, "public"));
app.use(cors());

app.use("/users", usersRouter);
app.use("/notes", notesRouter);

export default app;
