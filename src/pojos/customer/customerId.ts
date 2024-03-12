// sale counter schema
import { Schema, model } from "mongoose";

const customerCounterSchema = new Schema(
    {
        _id: { type: String, required: true },
        customerSeq: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const customerCounter = model("customerCounter", customerCounterSchema);

export default customerCounter;