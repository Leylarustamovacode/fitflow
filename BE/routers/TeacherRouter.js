import express from "express"
import {TeacherController} from "../controllers/TeacherControllers.js"
let router =express.Router()

router.get("/",TeacherController.getTeachers)
router.get("/:id",TeacherController.getTeacher)
router.post("/",TeacherController.postTeacher)
router.delete("/:id",TeacherController.deleteTeacher)

export default router;