import { Schema, model } from "mongoose";
import ROLE from "../../../helper/role";

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    designation: string;
    companyName: string;
    profEmail: string;
    address: string;
    password: string;
    confirmPassword: string;
    role: string
}

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: false
    },
    designation: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    profEmail: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    confirmPassword: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: ROLE?.Admin,
        enum: [ROLE?.Admin, ROLE?.SuperAdmin, ROLE?.User]
    },
})

export default model<User>("user", UserSchema)