import joi from "joi"


export let TeacherValidationSchema=joi.object({
    image:joi.string().uri().required(),
     image:joi.string().min(2).max(20).required(),
     text:joi.string().min(5).max(200).required()
})