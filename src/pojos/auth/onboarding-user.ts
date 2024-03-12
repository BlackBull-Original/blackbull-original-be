// import { Schema, model } from "mongoose";
import ROLE from "../../../helper/role";
import mongoose, { Schema, model } from "mongoose"


export interface OnboardingUser extends Document {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    number: string;
    username: string;
    domains: string
    avatar: string;
    employeeId: string
    accessLevel: string;
    designation: string;
    role: string;
    temporaryPassword: boolean;
    password: string;
    confirmPassword: string;
    requirePassword: boolean;
    sendPassword: boolean
    Admin: string;
}

const OnboardingUserSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    displayName: {
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
    username: {
        type: String,
        required: false
    },
    domains: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    employeeId: {
        type: String,
        required: false
    },
    accessLevel: {
        type: String,
        required: false
    },
    designation: {
        type: String,
        required: false
    },
    temporaryPassword: {
        type: Boolean,
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
    requirePassword: {
        type: Boolean,
        required: false
    },
    sendPassword: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        // default: ROLE?.Admin,
        // enum: [ROLE?.Admin, ROLE?.SuperAdmin, ROLE?.User]
    },
    Admin: { ref: "users", type: mongoose.Schema.Types.ObjectId },

})

export default model<OnboardingUser>("onboarding-user", OnboardingUserSchema)