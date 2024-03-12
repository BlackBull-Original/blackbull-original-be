import mongoose, { Document, Schema } from 'mongoose';

interface VehicleDetails {
    registrationNumber: string;
    registrationExpiry: string;
    vinNumber: string;
    vehicleManufacturer: string;
    vehicleModel: string;
    vehicleType: string;
    vehicleNumber: string;
    trailerNumber: string;
    typeOfTrailer: string;
    stateOfRegistration: string;
    engineNumber: string;
    compliancePlate: string;
    ownershipStatus: string;
    registrationStatus: string;
    insuranceCompanyName: string;
    policyNumber: string;
    vehicleInsuranceStartDate: string;
    renewalDate: string;
    dateValidUntil: string;
    daysLeft: string;
    insuranceCoverage: string;
    insuranceStatus: string;
    situation: string;
    truckOdometer: string;
    vehicleUploadDocument: string;
    documents: [{
        type: string,
        uploadDate: string,
        status: string
    }];
    rentedCompanyName: string;
    dateOfHire: string;
    contractValidTill: string;
    term: string;
    weeklyRent: string;
    tax: string;
    paymentMethod: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    vehicleDocumentStatus: string;
    Admin: mongoose.Schema.Types.ObjectId
}

interface VehicleDetailsDocument extends Document, VehicleDetails { }

const vehicleDetailsSchema = new Schema<VehicleDetailsDocument>({
    registrationNumber: { type: String, required: false },
    registrationExpiry: { type: String, required: false },
    vinNumber: { type: String, required: false },
    vehicleManufacturer: { type: String, required: false },
    vehicleModel: { type: String, required: false },
    vehicleType: { type: String, required: false },
    typeOfTrailer: { type: String, required: false },
    vehicleNumber: { type: String, required: false },
    trailerNumber: { type: String, required: false },
    stateOfRegistration: { type: String, required: false },
    engineNumber: { type: String, required: false },
    compliancePlate: { type: String, required: false },
    ownershipStatus: { type: String, required: false },
    registrationStatus: { type: String, required: false },
    insuranceCompanyName: { type: String, required: false },
    policyNumber: { type: String, required: false },
    vehicleInsuranceStartDate: { type: String, required: false },
    renewalDate: { type: String, required: false },
    dateValidUntil: { type: String, required: false },
    daysLeft: { type: String, required: false },
    insuranceCoverage: { type: String, required: false },
    insuranceStatus: { type: String, required: false },
    situation: { type: String, required: false },
    truckOdometer: { type: String, required: false },
    vehicleUploadDocument: { type: String, required: false },
    documents: [{
        type: {
            type: String,
            required: true,
        },
        uploadDate: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false
        },
    }],
    rentedCompanyName: {
        type: String,
        required: false
    },
    dateOfHire: {
        type: String,
        required: false
    },
    contractValidTill: {
        type: String,
        required: false
    },
    term: {
        type: String,
        required: false
    },
    weeklyRent: {
        type: String,
        required: false
    },
    tax: {
        type: String,
        required: false
    },
    paymentMethod: {
        type: String,
        required: false
    },
    bankName: {
        type: String,
        required: false
    },
    accountNumber: {
        type: String,
        required: false
    },
    accountName: {
        type: String,
        required: false
    },
    vehicleDocumentStatus: {
        type: String,
        required: false
    },
    Admin: { ref: "users", type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true });

const VehicleModel = mongoose.model<VehicleDetailsDocument>('Vehicle', vehicleDetailsSchema);

export default VehicleModel;
