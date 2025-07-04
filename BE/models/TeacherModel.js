import mongoose from "mongoose";

let TeacherSchema=new mongoose.Schema({
  image:String,
  name:String,
  sport:String,
  text:String,
})
export let TeacherModel = mongoose.model("teacher",TeacherSchema)