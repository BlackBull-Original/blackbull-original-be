import mongoose, { Schema, model } from "mongoose"

interface DriverDetails {
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: string,
    avatar: string;
    email: string,
    mobile: string,
    currentAddress: {
        houseNumber: number,
        street: string,
        suburb: string,
        state: string,
        country: string,
        pincode: string,
    }
    permanentAddress: {
        houseNumber: number,
        street: string,
        suburb: string,
        state: string,
        country: string,
        pincode: string,
    }
    emergencyContactInformation: {
        contactName: string,
        contactNumber: string,
        relationship: string
    }
    employmentHistory: [{
        previousEmployer: string,
        yearsOfExperience: string,
        reasonOfLeaving: string,
        companyName: string,
        referenceContactName: string,
        referenceEmailId: string,
        referenceContactNumber: string
    }]
    licenseDetails: {
        licenseNumber: string,
        licenseCardNumber: string,
        licenseType: string,
        state: string,
        dateOfIssue: string,
        expiryDate: string,
        daysLeftForRenewal: string,
        documents: []
    }
    specialDrivingLicense: string,
    onboardingDocuments: [{
        type: string,
        uploadDate: string,
        // status: string
    }]

    // visaStatus: {
    //     type: string,
    //     uploadDate: string
    // },
    // driverLicenseFront: {
    //     type: string,
    //     uploadDate: string
    // },
    // driverLicenseBack: {
    //     type: string,
    //     uploadDate: string
    // },
    // licenseHistory: {
    //     type: string,
    //     uploadDate: string
    // },
    // policeVerification: {
    //     type: string,
    //     uploadDate: string
    // },
    // passportFront: {
    //     type: string,
    //     uploadDate: string
    // },
    // passportBack: {
    //     type: string,
    //     uploadDate: string
    // },
    // healthInsurance: {
    //     type: string,
    //     uploadDate: string
    // },
    // driverCertificate: {
    //     type: string,
    //     uploadDate: string
    // },
    // fitness: {
    //     type: string,
    //     uploadDate: string
    // },
    // drugTest: {
    //     type: string,
    //     uploadDate: string
    // },
    Admin: mongoose.Schema.Types.ObjectId
}

const driverSchema = new Schema<DriverDetails>({
    firstName: {
        type: String,
        required: false
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    currentAddress: {
        houseNumber: {
            type: Number,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        suburb: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        pincode: {
            type: String,
            required: false
        },
    },
    permanentAddress: {
        houseNumber: {
            type: Number,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        suburb: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        pincode: {
            type: String,
            required: false
        },
    },
    emergencyContactInformation: {
        contactName: {
            type: String,
            required: false
        },
        contactNumber: {
            type: String,
            required: false
        },
        relationship: {
            type: String,
            required: false
        }
    },
    employmentHistory: [{
        previousEmployer: {
            type: String,
            required: false
        },
        yearsOfExperience: {
            type: String,
            required: false
        },
        reasonOfLeaving: {
            type: String,
            required: false
        },
        companyName: {
            type: String,
            required: false
        },
        referenceContactName: {
            type: String,
            required: false
        },
        referenceEmailId: {
            type: String,
            required: false
        },
        referenceContactNumber: {
            type: String,
            required: false
        }
    }],
    licenseDetails: {
        licenseNumber: {
            type: String,
            required: false
        },
        licenseCardNumber: {
            type: String,
            required: false
        },
        licenseType: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        dateOfIssue: {
            type: String,
            required: false
        },
        expiryDate: {
            type: String,
            required: false
        },
        daysLeftForRenewal: {
            type: String,
            required: false
        },
        documents: [{
            type: String,
            required: false
        }],
    },
    specialDrivingLicense: {
        type: String,
        required: false
    },
    onboardingDocuments: [{
        type: {
            type: String,
            required: true,
        },
        uploadDate: {
            type: String,
            required: false,
        },
        // status: {
        //     type: String,
        //     required: false
        // },
    }],
    // visaStatus: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false
    //     },
    // },
    // driverLicenseFront: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // driverLicenseBack: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // licenseHistory: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // policeVerification: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // passportFront: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // passportBack: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // healthInsurance: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // driverCertificate: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // fitness: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    // drugTest: {
    //     type: {
    //         type: String,
    //         required: true,
    //     },
    //     uploadDate: {
    //         type: String,
    //         required: false,
    //     },
    // },
    Admin: { ref: "users", type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true })

export default model<DriverDetails>("driver", driverSchema)

