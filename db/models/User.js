import { string } from "joi";
import { Schema, model } from "mongoose";

const userShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
    }

}, {versionKey:false})

const User = model("user", userShema)