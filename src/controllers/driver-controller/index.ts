import { Request, Response } from "express";
import { DriverDetails } from "../../../type";
import DriverModel from "../../pojos/driver";
import { DeleteDriverService, FetchedAllDriverService, FetchedDriverServiceById, driverService } from "../../services/driver-service";
import { isValidObjectId } from "mongoose";
import { upload } from "../../../helper/multer";
import { DriverDocuments, DriverOnboardingDocuments } from "../../../helper/enum";
import { dynamicDriverURL } from "../../../utils";
import fs from 'fs';

export const DriverController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const driver: DriverDetails = req.body;
        console.log({ driver })
        const checkIfExists = async (field: string, value: string, errorMessage: string) => {
            const existingRecord = await DriverModel.findOne({ [field]: value });
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
        const data = await driverService(driver, userId);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchedDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await FetchedDriverServiceById(req.params.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchedAllDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const data = await FetchedAllDriverService(currentUser.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const DeleteDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DeleteDriverService(id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateDriverController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        const DriverDataForUpdate: DriverDetails = req.body;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DriverModel.findByIdAndUpdate(
            id,
            DriverDataForUpdate,
            { new: true }
        )
        if (!data) return res.status(404).json({ error: "Driver not found" });
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


export const handleDriverProfileController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverProfile = uploadedFiles.map(file => dynamicDriverURL(DriverDocuments.Profile, file.filename));
            try {
                await Promise.all(driverProfile.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverProfile[0];
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

export const handleDriverLicenseDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverLicenseDocuments = uploadedFiles.map(file => dynamicDriverURL(DriverDocuments.LicenseDocuments, file.filename));
            try {
                await Promise.all(driverLicenseDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverLicenseDocuments[0];
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
export const handleDriverOnboardingDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverLicenseDocuments = uploadedFiles.map(file => dynamicDriverURL(DriverDocuments.OnoardingDocuments, file.filename));
            try {
                await Promise.all(driverLicenseDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = driverLicenseDocuments[0];
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

// :::::::::::::::::::::::::::::::::::::::::::::: DRIVER ONBOARDING DOCUMENTS ::::::::::::::::::::::::::::::::::::::::::::::
// export const handleDriverVisaStatusController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const driverOnboardingDocuments = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.VisaStatus, file.filename));
//             try {
//                 await Promise.all(driverOnboardingDocuments.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = driverOnboardingDocuments[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handleDriverLicenseFrontController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const driverLicenseFront = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.DriverLicenseFront, file.filename));
//             try {
//                 await Promise.all(driverLicenseFront.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = driverLicenseFront[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }


// export const handleDriverLicenseBackController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const driverLicenseBack = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.DriverLicenseBack, file.filename));
//             try {
//                 await Promise.all(driverLicenseBack.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = driverLicenseBack[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }


// export const handleLicenseHistoryController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const linceseHistory = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.LinceseHistory, file.filename));
//             try {
//                 await Promise.all(linceseHistory.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = linceseHistory[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handlePoliceVerificationController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const policeVerification = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.PoliceVerification, file.filename));
//             try {
//                 await Promise.all(policeVerification.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = policeVerification[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handlePassportFrontController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const passportFront = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.PassportFront, file.filename));
//             try {
//                 await Promise.all(passportFront.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = passportFront[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handlePassportBackController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const passportBack = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.PassportBack, file.filename));
//             try {
//                 await Promise.all(passportBack.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = passportBack[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handleHealthInsurancCeontroller = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const healthInsurance = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.HealthInsurance, file.filename));
//             try {
//                 await Promise.all(healthInsurance.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = healthInsurance[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }


// export const handleDriverCertificateController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const driverCertificate = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.DriverCertificate, file.filename));
//             try {
//                 await Promise.all(driverCertificate.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = driverCertificate[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handleFitnessController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const fitness = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.Fitness, file.filename));
//             try {
//                 await Promise.all(fitness.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = fitness[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }

// export const handleDrugTestController = async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const drugTest = uploadedFiles.map(file => dynamicDriverURL(DriverOnboardingDocuments.DrugTest, file.filename));
//             try {
//                 await Promise.all(drugTest.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = drugTest[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// }


const handleUpload = async (req: Request, res: Response, documentType: DriverOnboardingDocuments) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicDriverURL(documentType, file.filename));
            try {
                await Promise.all(documents.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = documents[0];
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

export const handleDriverVisaStatusController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.VisaStatus);
}

export const handleDriverLicenseFrontController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.DriverLicenseFront);
}

export const handleDriverLicenseBackController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.DriverLicenseBack);
}

export const handleLicenseHistoryController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.LicenseHistory);
}

export const handlePoliceVerificationController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.PoliceVerification);
}

export const handlePassportFrontController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.PassportFront);
}

export const handlePassportBackController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.PassportBack);
}

export const handleHealthInsurancCeontroller = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.HealthInsurance);
}

export const handleDriverCertificateController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.DriverCertificate);
}

export const handleFitnessController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.Fitness);
}

export const handleDrugTestController = async (req: Request, res: Response) => {
    await handleUpload(req, res, DriverOnboardingDocuments.DrugTest);
}


// Futher optimise this code
// const handleDocumentUpload = (documentType: DriverOnboardingDocuments) => async (req: Request, res: Response) => {
//     try {
//         upload(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Error uploading files.' });
//             }
//             const uploadedFiles = req.files as Express.Multer.File[];
//             const documents = uploadedFiles.map(file => dynamicDriverURL(documentType, file.filename));
//             try {
//                 await Promise.all(documents.map(async (filePath) => {
//                     console.log({ filePath });
//                     if (fs.existsSync(filePath)) {
//                         fs.unlinkSync(filePath);
//                     }
//                 }));
//                 const url = documents[0];
//                 return res.json({
//                     success: true,
//                     message: 'Files uploaded successfully.',
//                     response: url
//                 });
//             } catch (error) {
//                 return res.status(500).json({ success: false, message: 'Error handling files.' });
//             }
//         });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: 'Internal server error.' });
//     }
// };

// export const handleDriverVisaStatusController = handleDocumentUpload(DriverOnboardingDocuments.VisaStatus);
// export const handleDriverLicenseFrontController = handleDocumentUpload(DriverOnboardingDocuments.DriverLicenseFront);
// export const handleDriverLicenseBackController = handleDocumentUpload(DriverOnboardingDocuments.DriverLicenseBack);
// export const handleLicenseHistoryController = handleDocumentUpload(DriverOnboardingDocuments.LicenseHistory);
// export const handlePoliceVerificationController = handleDocumentUpload(DriverOnboardingDocuments.PoliceVerification);
// export const handlePassportFrontController = handleDocumentUpload(DriverOnboardingDocuments.PassportFront);
// export const handlePassportBackController = handleDocumentUpload(DriverOnboardingDocuments.PassportBack);
// export const handleHealthInsuranceController = handleDocumentUpload(DriverOnboardingDocuments.HealthInsurance);
// export const handleDriverCertificateController = handleDocumentUpload(DriverOnboardingDocuments.DriverCertificate);
// export const handleFitnessController = handleDocumentUpload(DriverOnboardingDocuments.Fitness);
// export const handleDrugTestController = handleDocumentUpload(DriverOnboardingDocuments.DrugTest);