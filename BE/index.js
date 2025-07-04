import express from "express";
import TeacherRouter from "./routers/TeacherRouter.js";
import UserRouter from "./routers/UserRouter.js";
import "./config/config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/teacher", TeacherRouter);
app.use("/user", UserRouter);

app.listen(3000, () => {
    console.log("Server 3000 portunda işləyir");
});
