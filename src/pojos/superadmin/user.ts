import { Schema, model } from "mongoose";
export interface SuperadminUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    designation: string;
    companyName: string;
    profEmail: string;
    address: string;
    password: string;
}

const SuperadminSchema = new Schema({
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
})

export default model<SuperadminUser>("user-superadmin", SuperadminSchema)