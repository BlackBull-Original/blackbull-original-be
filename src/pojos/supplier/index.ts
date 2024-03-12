import mongoose, { Schema, model } from "mongoose"

interface SupplierDetails {
    companyName: string,
    tradingName: string,
    abn: string,
    legalName: string,
    website: string,
    profile: string,

    opreations: {
        contactPerson: string,
        desgination: string,
        number: string,
        opreationEmail: string
    },

    compliance: {
        contactPerson: string,
        desgination: string,
        number: string,
        complianceEmail: string
    },

    admin: {
        contactPerson: string,
        desgination: string,
        number: string,
        adminEmail: string
    },

    dispatch: {
        contactPerson: string,
        desgination: string,
        number: string,
        dispatchEmail: string
    },

    invoicePreferences: string,
    invoiceCommunicationPreferences: string,

    companySuiteDetails: [
        designation: string,
        directorEmailAddress: string,
        directorNumber: string
    ],

    bankDetails: {
        accountName: string,
        bankName: string,
        bsb: string,
        accountNumber: string
    },

    businessCoverage: {
        areaCovered: string,
        businessOpreations: string
    },

    warehouseDetails: [
        state: string,
        street1: string,
        street2: string,
        suburb: string,
        postcode: string,
        typeOfCarrier: string
    ],

    certificateOfAccreditation: {
        accreditationNumber: string,
        massManagementExpiryDate: string,
        basicFatiqueExpiryDate: string,
        dangerousGooodsExpiryDate: string
        nhvassExpiryDate: string,
        haccpExpiryDate: string,
        uploadAccreditationDocuments: string
    }

    accreditationDocument: string,

    insuranceDetails: {
        productLiability: {
            policyNumber: string,
            insurer: string,
            expiryDate: string,
            sumAssured: string,
            document: string
        },
        publicLiability: {
            policyNumber: string,
            insurer: string,
            expiryDate: string,
            sumAssured: string,
            document: string
        },
        workCover: {
            employerNumber: string,
            valid: string,
            validTill: string,
            duesDays: number,
            document: string
        },
        marineGeneral: {
            policyNumber: string,
            insurer: string,
            expiryDate: string,
            sumAssured: string,
            document: string
        },
        marineAlcohol: {
            policyNumber: string,
            insurer: string,
            expiryDate: string,
            sumAssured: string,
            document: string
        },
        coc: {
            policyNumber: string,
            insurer: string,
            expiryDate: string,
            sumAssured: string,
            document: string
        },
    },
    onboardingDocuments: [{
        type: string,
        uploadDate: string,
        status: string
    }],
    drug: {
        type: string,
        uploadDate: Date
    },
    alcoholPolicy: {
        type: string,
        uploadDate: Date
    },
    procedure: {
        type: string,
        uploadDate: Date
    },
    riskManagementPolicy: {
        type: string,
        uploadDate: Date
    },
    speedPolicy: {
        type: string,
        uploadDate: Date
    },
    fatiquePolicyPresentationSystem: {
        type: string,
        uploadDate: Date
    },
    gpsSnapshot: {
        type: string,
        uploadDate: Date
    },
    workHealthSafetyPolicy: {
        type: string,
        uploadDate: Date
    },
    Admin: mongoose.Schema.Types.ObjectId
}

const supplierSchema = new Schema<SupplierDetails>({
    companyName: {
        type: String,
        required: false
    },
    tradingName: {
        type: String,
        required: false
    },
    abn: {
        type: String,
        required: false
    },
    legalName: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    profile: {
        type: String,
        required: false
    },

    opreations: {
        contactPerson: {
            type: String,
            required: false
        },
        desgination: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        opreationEmail: {
            type: String,
            required: false
        }
    },

    compliance: {
        contactPerson: {
            type: String,
            required: false
        },
        desgination: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        complianceEmail: {
            type: String,
            required: false
        }
    },

    admin: {
        contactPerson: {
            type: String,
            required: false
        },
        desgination: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        adminEmail: {
            type: String,
            required: false
        },
    },

    dispatch: {
        contactPerson: {
            type: String,
            required: false
        },
        desgination: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        dispatchEmail: {
            type: String,
            required: false
        },
    },

    invoicePreferences: {
        type: String,
        required: false
    },
    invoiceCommunicationPreferences: {
        type: String,
        required: false
    },

    companySuiteDetails: [
        {
            designation: {
                type: String,
                required: false
            },
            directorEmailAddress: {
                type: String,
                required: false
            },
            directorNumber: {
                type: String,
                required: false
            }
        }
    ],

    bankDetails: {
        accountName: {
            type: String,
            required: false
        },
        bankName: {
            type: String,
            required: false
        },
        bsb: {
            type: String,
            required: false
        },
        accountNumber: {
            type: String,
            required: false
        }
    },

    businessCoverage: {
        areaCovered: {
            type: String,
            required: false
        },
        businessOpreations: {
            type: String,
            required: false
        },
    },

    warehouseDetails: [
        {
            state: {
                type: String,
                required: false
            },
            street1: {
                type: String,
                required: false
            },
            street2: {
                type: String,
                required: false
            },
            suburb: {
                type: String,
                required: false
            },
            postcode: {
                type: String,
                required: false
            },
            typeOfCarrier: {
                type: String,
                required: false
            },
        }
    ],

    certificateOfAccreditation: {
        accreditationNumber: {
            type: String,
            required: false
        },
        massManagementExpiryDate: {
            type: String,
            required: false
        },
        basicFatiqueExpiryDate: {
            type: String,
            required: false
        },
        dangerousGooodsExpiryDate: {
            type: String,
            required: false
        },
        nhvassExpiryDate: {
            type: String,
            required: false
        },
        haccpExpiryDate: {
            type: String,
            required: false
        },
        uploadAccreditationDocuments: {
            type: String,
            required: false
        }
    },

    accreditationDocument: {
        type: String,
        required: false
    },

    insuranceDetails: {
        productLiability: {
            policyNumber: {
                type: String,
                required: false
            },
            insurer: {
                type: String,
                required: false
            },
            expiryDate: {
                type: String,
                required: false
            },
            sumAssured: {
                type: String,
                required: false
            },
            document: {
                type: String,
                required: false
            },
        },
        publicLiability: {
            policyNumber: {
                type: String,
                required: false
            },
            insurer: {
                type: String,
                required: false
            },
            expiryDate: {
                type: String,
                required: false
            },
            sumAssured: {
                type: String,
                required: false
            },
            document: {
                type: String,
                required: false
            },
        },
        workCover: {
            employerNumber: {
                type: String,
                required: false
            },
            valid: {
                type: String,
                required: false
            },
            validTill: {
                type: String,
                required: false
            },
            duesDays: {
                type: Number,
                required: false
            },
            document: {
                type: String,
                required: false
            },
        },
        marineGeneral: {
            policyNumber: {
                type: String,
                required: false
            },
            insurer: {
                type: String,
                required: false
            },
            expiryDate: {
                type: String,
                required: false
            },
            sumAssured: {
                type: String,
                required: false
            },
            document: {
                type: String,
                required: false
            },
        },
        marineAlcohol: {
            policyNumber: {
                type: String,
                required: false
            },
            insurer: {
                type: String,
                required: false
            },
            expiryDate: {
                type: String,
                required: false
            },
            sumAssured: {
                type: String,
                required: false
            },
            document: {
                type: String,
                required: false
            },
        },
        coc: {
            policyNumber: {
                type: String,
                required: false
            },
            insurer: {
                type: String,
                required: false
            },
            expiryDate: {
                type: String,
                required: false
            },
            sumAssured: {
                type: String,
                required: false
            },
            document: {
                type: String,
                required: false
            },
        },
    },
    onboardingDocuments: [{
        type: {
            type: String,
            required: false,
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
    drug: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    alcoholPolicy: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    procedure: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    riskManagementPolicy: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    speedPolicy: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    fatiquePolicyPresentationSystem: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    gpsSnapshot: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    workHealthSafetyPolicy: {
        type: {
            type: String,
            required: false
        },
        uploadDate: {
            type: Date,
            required: false
        }
    },
    Admin: { ref: "users", type: mongoose.Schema.Types.ObjectId },
}, { timestamps: true })

export default model<SupplierDetails>("supplier", supplierSchema)

