import { Request, Response } from "express";
import { SupplierDriverDetails, SupplierVehicle } from "../../../type";
import { isValidObjectId } from "mongoose";
import { DeleteSupplierDriverService, FetchedAllSupplierDriverService, FetchedSupplierDriverServiceById, supplierDriverService } from "../../services/supplier-service/supplier-driver";
import supplierDriver from "../../pojos/supplier/supplier-driver";
import { dynamicSupplierDriverURL } from "../../../utils";
import { SupplierComplianceDocuments, SupplierDriverOnboardingDocuments } from "../../../helper/enum";
import { upload } from "../../../helper/multer";
import fs from "fs"

export const handleSupplierDriverController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const driver: SupplierDriverDetails = req.body;
        console.log({ driver })
        const checkIfExists = async (field: string, value: string, errorMessage: string) => {
            const existingRecord = await supplierDriver.findOne({ [field]: value });
            return existingRecord ? errorMessage : null;
        };
        const errors = await Promise.all([
            checkIfExists('email', driver.email, "* Email already exists."),
            checkIfExists('mobile', driver.mobile, "* Mobile already exists."),
            checkIfExists('licenseDetails.licenseNumber', driver.licenseDetails.licenseNumber, "* License number already exists."),
            checkIfExists('licenseDetails.licenseCardNumber', driver.licenseDetails.licenseCardNumber, "* License card number already exists."),
        ]);
        const errorMessages = errors.filter(Boolean);
        if (errorMessages.length > 0) {
            return res.status(400).json({ success: false, messages: errorMessages });
        }
        const data = await supplierDriverService(driver, userId);
        res.json({ data });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchedSupplierDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await FetchedSupplierDriverServiceById(req.params.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const FetchedAllSupplierDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const data = await FetchedAllSupplierDriverService(currentUser.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteSupplierDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DeleteSupplierDriverService(id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateSupplierDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        const SupplierVehicleDataForUpdate: SupplierVehicle = req.body;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await supplierDriver.findByIdAndUpdate(
            id,
            SupplierVehicleDataForUpdate,
            { new: true }
        )
        if (!data) return res.status(404).json({ error: "Vehicle not found" });
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const handleSupplierDriverProfileController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDriverProfile = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierComplianceDocuments.Profile, file.filename));
            try {
                await Promise.all(supplierDriverProfile.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierDriverProfile[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handleSupplierDriverLicenseDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDriverLicenseDocuments = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierComplianceDocuments.LicenseDocuments, file.filename));
            try {
                await Promise.all(supplierDriverLicenseDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierDriverLicenseDocuments[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


export const handleSupplierDriverOnboardingDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDriverOnboardingDocuments = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.OnboardingDocuments, file.filename));
            try {
                await Promise.all(supplierDriverOnboardingDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierDriverOnboardingDocuments[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: supplierDriverOnboardingDocuments
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

// :::::::::::::::::::::::::::::::::::::::::::::: SUPPLIER DRIVER ONBOARDING DOCUMENTS ::::::::::::::::::::::::::::::::::::::::::::::

export const handleDriverVisaStatusController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverOnboardingDocuments = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.VisaStatus, file.filename));
            try {
                await Promise.all(driverOnboardingDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverOnboardingDocuments[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handleDriverLicenseFrontController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverLicenseFront = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.DriverLicenseFront, file.filename));
            try {
                await Promise.all(driverLicenseFront.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverLicenseFront[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


export const handleDriverLicenseBackController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverLicenseBack = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.DriverLicenseBack, file.filename));
            try {
                await Promise.all(driverLicenseBack.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverLicenseBack[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


export const handleLicenseHistoryController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const linceseHistory = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.LicenseHistory, file.filename));
            try {
                await Promise.all(linceseHistory.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = linceseHistory[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handlePoliceVerificationController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const policeVerification = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.PoliceVerification, file.filename));
            try {
                await Promise.all(policeVerification.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = policeVerification[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handlePassportFrontController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const passportFront = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.PassportFront, file.filename));
            try {
                await Promise.all(passportFront.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = passportFront[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handlePassportBackController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const passportBack = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.PassportBack, file.filename));
            try {
                await Promise.all(passportBack.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = passportBack[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handleHealthInsurancCeontroller = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const healthInsurance = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.HealthInsurance, file.filename));
            try {
                await Promise.all(healthInsurance.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = healthInsurance[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


export const handleDriverCertificateController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverCertificate = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.DriverCertificate, file.filename));
            try {
                await Promise.all(driverCertificate.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverCertificate[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handleFitnessController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const fitness = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.Fitness, file.filename));
            try {
                await Promise.all(fitness.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = fitness[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

export const handleDrugTestController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const drugTest = uploadedFiles.map(file => dynamicSupplierDriverURL(SupplierDriverOnboardingDocuments.DrugTest, file.filename));
            try {
                await Promise.all(drugTest.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = drugTest[0];
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: url
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}