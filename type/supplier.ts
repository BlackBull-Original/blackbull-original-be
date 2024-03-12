export interface SupplierTypes {
    companyName: string;
    tradingName: string;
    abn: string;
    legalName: string;
    website: string;
    profile: string;
    opreations: ContactDetails;
    compliance: ContactDetails;
    admin: ContactDetails;
    dispatch: ContactDetails;
    invoicePreferences: string;
    invoiceCommunicationPreferences: string;
    companySuiteDetails: SuiteDetails[];
    bankDetails: BankDetails;
    businessCoverage: BusinessCoverage;
    warehouseDetails: WarehouseDetails[];
    certificateOfAccreditation: AccreditationDetails;
    accreditationDocument: string;
    insuranceDetails: InsuranceDetails;
    drug: PolicyDetails;
    alcoholPolicy: PolicyDetails;
    procedure: PolicyDetails;
    riskManagementPolicy: PolicyDetails;
    speedPolicy: PolicyDetails;
    fatiquePolicyPresentationSystem: PolicyDetails;
    gpsSnapshot: PolicyDetails;
    workHealthSafetyPolicy: PolicyDetails;
}

interface ContactDetails {
    contactPerson: string;
    desgination: string;
    number: string;
    email: string;
}

interface SuiteDetails {
    directorName: string;
    directorEmailAddress: string;
    directorNumber: string;
}

interface BankDetails {
    accountName: string;
    bankName: string;
    bsb: string;
    accountNumber: string;
}

interface BusinessCoverage {
    areaCovered: string;
    businessOpreations: string;
}

interface WarehouseDetails {
    state: string;
    street1: string;
    street2: string;
    suburb: string;
    postcode: string;
    typeOfCarrier: string;
}

interface AccreditationDetails {
    accreditationNumber: string;
    massManagementExpiryDate: string;
    basicFatiqueExpiryDate: string;
    dangerousGooodsExpiryDate: string;
    nhvassExpiryDate: string;
    haccpExpiryDate: string;
    uploadAccreditationDocuments: string;
}

interface InsuranceDetails {
    productLiability: InsurancePolicy;
    publicLiability: InsurancePolicy;
    workCover: WorkCoverInsurance;
    marineGeneral: InsurancePolicy;
    marineAlcohol: InsurancePolicy;
    coc: InsurancePolicy;
}

interface InsurancePolicy {
    policyNumber: string;
    insurer: string;
    expiryDate: string;
    sumAssured: string;
    document: string;
}

interface WorkCoverInsurance {
    employerNumber: string;
    valid: string;
    validTill: string;
    duesDays: number;
    document: string;
}

interface PolicyDetails {
    type: string;
    uploadDate: Date;
}
