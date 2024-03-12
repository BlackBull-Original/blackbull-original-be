// interfaces/VehicleDetails.ts
export interface VehicleDetails {
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
    upload: [];
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
}

export interface DriverDetails {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    avatar: string;
    email: string;
    mobile: string;
    currentAddress: {
        houseNumber: number;
        street: string;
        suburb: string;
        state: string;
        country: string;
        pincode: string;
    };
    permanentAddress: {
        houseNumber: number;
        street: string;
        suburb: string;
        state: string;
        country: string;
        pincode: string;
    };
    emergencyContactInformation: {
        contactName: string;
        contactNumber: string;
        relationship: string;
    };
    employmentHistory: [
        {
            previousEmployer: string;
            yearsOfExperience: string;
            reasonOfLeaving: string;
            companyName: string;
            referenceContactName: string;
            referenceEmailId: string;
            referenceContactNumber: string;
        }
    ];
    licenseDetails: {
        licenseNumber: string;
        licenseCardNumber: string;
        licenseType: string;
        state: string;
        dateOfIssue: string;
        expiryDate: string;
        daysLeftForRenewal: string;
        documents: [];
    };
    specialDrivingLicense: string;

    visaStatus: {
        type: string;
        uploadDate: Date;
    };
    driverLicenseFront: {
        type: string;
        uploadDate: Date;
    };
    driverLicenseBack: {
        type: string;
        uploadDate: Date;
    };
    licenseHistory: {
        type: string;
        uploadDate: Date;
    };
    policeVerification: {
        type: string;
        uploadDate: Date;
    };
    passportFront: {
        type: string;
        uploadDate: Date;
    };
    passportBack: {
        type: string;
        uploadDate: Date;
    };
    healthInsurance: {
        type: string;
        uploadDate: Date;
    };
    driverCertificate: {
        type: string;
        uploadDate: Date;
    };
    fitness: {
        type: string;
        uploadDate: Date;
    };
    drugTest: {
        type: string;
        uploadDate: Date;
    };
}

export interface CustomerDetails {
    avatar: string;
    companyName: string;
    tradingName: string;
    abnNumber: string;
    legalName: string;
    websiteAddress: string;
    customerId: string;
    firstName: string;
    lastName: string;
    designation: string;

    companyAddress: {
        street1: string;
        street2: string;
        suburb: string;
        state: string;
        country: string;
        postCode: string;
    };

    accountPayble: {
        contactPerson: string;
        designation: string;
        contactNumber: string;
        accountsPaybleEmail: string;
    };

    accountReceivable: {
        contactPerson: string;
        designation: string;
        contactNumber: string;
        accountsReceivableEmail: string;
    };

    opreations: {
        contactPerson: string;
        designation: string;
        contactNumber: string;
        opreationsEmail: string;
    };

    compliance: {
        contactPerson: string;
        designation: string;
        contactNumber: string;
        complianceEmail: string;
    };

    admin: {
        contactPerson: string;
        designation: string;
        contactNumber: string;
        adminEmail: string;
    };

    invoicePrefrences: string;
    invoiceCommunicationPrefrences: string;

    companySuiteDetails: [
        {
            designation: string;
            directorEmailAddress: string;
            directorContactNumber: string;
        }
    ];

    payment: {
        accountName: string;
        bankName: string;
        bsb: string;
        accountNumber: string;
    };
    paymentTerm: string;

    warehouseLocation: {
        street1: string;
        street2: string;
        suburb: string;
        state: string;
        country: string;
        postCode: string;
    };

    document: [];
}

export interface SupplierVehicle {
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
    vehicleDocuments: [],
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
}

export interface SupplierDriverDetails {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    avatar: string;
    email: string;
    mobile: string;
    nationality: string;
    currentAddress: {
        houseNumber: number;
        street: string;
        suburb: string;
        state: string;
        country: string;
        pincode: string;
    };
    permanentAddress: {
        houseNumber: number;
        street: string;
        suburb: string;
        state: string;
        country: string;
        pincode: string;
    };
    emergencyContactInformation: {
        contactName: string;
        contactNumber: string;
        relationship: string;
    };
    employmentHistory: [
        {
            previousEmployer: string;
            yearsOfExperience: number;
            reasonOfLeaving: string;
            companyName: string;
            referenceContactName: string;
            referenceEmailId: string;
            referenceContactNumber: string;
        }
    ];
    licenseDetails: {
        licenseNumber: string;
        licenseCardNumber: string;
        licenseType: string;
        state: string;
        dateOfIssue: string;
        expiryDate: string;
        daysLeftForRenewal: string;
        documents: [];
    };
    specialDrivingLicense: string;

    visaStatus: {
        type: string;
        uploadDate: string;
    };
    driverLicenseFront: {
        type: string;
        uploadDate: string;
    };
    driverLicenseBack: {
        type: string;
        uploadDate: string;
    };
    licenseHistory: {
        type: string;
        uploadDate: string;
    };
    policeVerification: {
        type: string;
        uploadDate: string;
    };
    passportFront: {
        type: string;
        uploadDate: string;
    };
    passportBack: {
        type: string;
        uploadDate: string;
    };
    healthInsurance: {
        type: string;
        uploadDate: string;
    };
    driverCertificate: {
        type: string;
        uploadDate: string;
    };
    fitness: {
        type: string;
        uploadDate: string;
    };
    drugTest: {
        type: string;
        uploadDate: string;
    };
}

export interface OnboardingUser {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    number: string;
    username: string;
    domains: string[];
    avatar: string;
    employeeId: string;
    accessLevel: string;
    designation: string;
    role: string;
    temporaryPassword: boolean;
    password: string;
    confirmPassword: string;
    requirePassword: boolean;
    sendPassword: boolean;
}
