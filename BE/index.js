import express from "express";
import TeacherRouter from "./routers/TeacherRouter.js";
import "./config/config.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/teacher", TeacherRouter);

app.listen(3000, () => {
    console.log("bu app 3000 portunda dinlenilir");
});
