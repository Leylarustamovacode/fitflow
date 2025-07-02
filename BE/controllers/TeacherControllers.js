

import {TeacherModel} from "../models/TeacherModel.js";
import { TeacherValidationSchema } from "../validations/TeacherValidation.js";
 export let TeacherController = {
    getTeachers: async (req, res) => {
        let teacher = await TeacherModel.find();
        res.send(teacher);
    },
    getTeacher: async (req, res) => {
        let { id } = req.params;
        let teacher = await TeacherModel.findById(id);
        res.send(teacher);
    },
    postTeacher: async (req, res) => {
        let newTeacher = TeacherModel(req.body);
        await newTeacher.save();
        res.send(newTeacher);
    },
    deleteTeacher: async (req, res) => {
        let { id } = req.params;
        await TeacherModel.findByIdAndDelete(id);
        res.send("deleted");
    }
};


