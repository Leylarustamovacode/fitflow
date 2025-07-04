import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: { type: String, unique: true },
    password: String,
    confirmPassword: Number
});

export let UserModel = mongoose.model("user", UserSchema);
