import mongoose, { Document, Schema } from 'mongoose';

interface SupplierVehicleDetails {
    registrationNumber: string;
    registrationExpiry: Date;
    vinNumber: string;
    vehicleManufacturer: string;
    vehicleModel: string;
    vehicleType: string;
    typeOfTrailer: string;
    stateOfRegistration: string;
    engineNumber: string;
    compliancePlate: string;

    registrationStatus: string;
    document: string;
    vehicleDocuments: [{
        type: string,
        uploadDate: string,
        status: string
    }];
    insuranceCompanyName: string;
    policyNumber: string;
    vehicleInsuranceStartDate: Date;

    renewalDate: Date;
    dateValidUntil: Date;
    daysLeft: number;

    insuranceCoverage: string;
    insuranceStatus: string;
    situation: string;
    truckOdometer: string;

    Admin: mongoose.Schema.Types.ObjectId;
}


interface VehicleDetailsDocument extends Document, SupplierVehicleDetails { }

const supplierVehicleDetailsSchema = new Schema<VehicleDetailsDocument>({
    registrationNumber: { type: String, required: false },
    registrationExpiry: { type: Date, required: false },
    vinNumber: { type: String, required: false },
    vehicleManufacturer: { type: String, required: false },
    vehicleModel: { type: String, required: false },
    vehicleType: { type: String, required: false },
    typeOfTrailer: { type: String, required: false },
    stateOfRegistration: { type: String, required: false },
    engineNumber: { type: String, required: false },
    compliancePlate: { type: String, required: false },
    document: { type: String, required: false },
    vehicleDocuments: [{
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        }
    }],
    registrationStatus: { type: String, required: false },
    insuranceCompanyName: { type: String, required: false },
    policyNumber: { type: String, required: false },
    vehicleInsuranceStartDate: { type: Date, required: false },
    renewalDate: { type: Date, required: false },
    dateValidUntil: { type: Date, required: false },
    daysLeft: { type: Number, required: false },
    insuranceCoverage: { type: String, required: false },
    insuranceStatus: { type: String, required: false },
    situation: { type: String, required: false },
    truckOdometer: { type: String, required: false },
    Admin: { ref: "users", type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true });

const VehicleModel = mongoose.model<VehicleDetailsDocument>('supplier-vehicle', supplierVehicleDetailsSchema);

export default VehicleModel;
