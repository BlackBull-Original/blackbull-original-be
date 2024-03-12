import { Request, Response } from "express";
import { SupplierTypes } from "../../../type/supplier";
import { DeleteSupplierService, FetchedAllSupplierService, FetchedSupplierServiceById, supplierService } from "../../services/supplier-service";
import SupplierModel from "../../pojos/supplier/index"
import { isValidObjectId } from "mongoose";
import { upload } from "../../../helper/multer";
import fs from 'fs';
import { dynamicSupplierURL } from "../../../utils";
import { SupplierComplianceDocuments } from "../../../helper/enum";


export const handleSupplierController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const supplier: SupplierTypes = req.body;
        console.log({ supplier })
        const checkIfExists = async (field: string, value: string, errorMessage: string) => {
            const existingRecord = await SupplierModel.findOne({ [field]: value });
            return existingRecord ? errorMessage : null;
        };
        const errors = await Promise.all([
            checkIfExists('abn', supplier.abn, "* ABN already exists."),
            checkIfExists('bankDetails.accountNumber', supplier.bankDetails.accountNumber, "* Account number already exists."),
        ]);
        const errorMessages = errors.filter(Boolean);
        if (errorMessages.length > 0) {
            return res.status(400).json({ success: false, messages: errorMessages });
        }
        const data = await supplierService(supplier, userId);
        res.json({ data });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getSupplierByIdController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await FetchedSupplierServiceById(req.params.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllSupplierController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const data = await FetchedAllSupplierService(currentUser.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSupplierByIdController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DeleteSupplierService(id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSupplierByIdController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        const SupplierDataForUpdate: SupplierTypes = req.body;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await SupplierModel.findByIdAndUpdate(
            id,
            SupplierDataForUpdate,
            { new: true }
        )
        if (!data) return res.status(404).json({ error: "Vehicle not found" });
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// :::::::::::::::::::::::::::::::::::::::::::::: SUPPLIER PROFILE ::::::::::::::::::::::::::::::::::::::::::::::
export const handleSupplierProfileController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDrugDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.Profile, file.filename));
            try {
                await Promise.all(supplierDrugDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierDrugDocuments[0];
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

export const handleSupplierAccreditationDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDrugDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.AccreditationDouments, file.filename));
            try {
                await Promise.all(supplierDrugDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierDrugDocuments[0];
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
// ==================================================== Insurance Documents Start=====================================================
export const handleSupplierProductLiabilityDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.ProductLiability, file.filename));
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

export const handleSupplierPublicLiabilityDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.PublicLiability, file.filename));
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


export const handleSupplierWorkCoverDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.WorkCover, file.filename));
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

export const handleSupplierMarineDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.Marine, file.filename));
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

export const handleSupplierMarineAlcoholDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.MarineAlcohol, file.filename));
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

export const handleSupplierCocDocuments = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.Coc, file.filename));
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

// ==================================================== Insurance Documents End=====================================================


export const handleSupplierComplianceDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const documents = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.ComplianceDocuments, file.filename));
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



// :::::::::::::::::::::::::::::::::::::::::::::: SUPPLIER DOCUMENTS ::::::::::::::::::::::::::::::::::::::::::::::
export const handleSupplierDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDocuments = uploadedFiles.map(file => dynamicSupplierURL("documents", file.filename));;
            try {
                await Promise.all(supplierDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                return res.json({
                    success: true,
                    message: 'Files uploaded successfully.',
                    response: supplierDocuments
                });
            } catch (error) {
                return res.status(500).json({ success: false, message: 'Error handling files.' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// :::::::::::::::::::::::::::::::::::::::::::::: SUPPLIER COMPLIANCE DOCUMSNTS UPLOADED ::::::::::::::::::::::::::::::::::::::::::::::
export const handleSupplierDrugDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierDrugDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.Drug, file.filename));
            try {
                await Promise.all(supplierDrugDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierDrugDocuments[0];
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


export const handleSupplierAlcoholPolicyDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierAlcoholPolicyDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.AlcoholPolicy, file.filename));
            try {
                await Promise.all(supplierAlcoholPolicyDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierAlcoholPolicyDocuments[0];
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

export const handleSupplierProcedureDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierProcedureDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.Procedure, file.filename));
            try {
                await Promise.all(supplierProcedureDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierProcedureDocuments[0];
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

export const handleSupplierRiskManagementPolicyDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierRiskManagementPolicyDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.RiskManagementPolicy, file.filename));
            try {
                await Promise.all(supplierRiskManagementPolicyDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierRiskManagementPolicyDocuments[0];
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

export const handleSupplierSpeedPolicyDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierSpeedPolicyDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.SpeedPolicy, file.filename));
            try {
                await Promise.all(supplierSpeedPolicyDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierSpeedPolicyDocuments[0];
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

export const handleSupplierFatiquePolicyPresentationSystemDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierFatiquePolicyPresentationSystemDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.FatiquePolicyPresentationSystem, file.filename));
            try {
                await Promise.all(supplierFatiquePolicyPresentationSystemDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierFatiquePolicyPresentationSystemDocuments[0];
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

export const handleSupplierGpsSnapshotDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierGpsSnapshotDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.GpsSnapshot, file.filename));
            try {
                await Promise.all(supplierGpsSnapshotDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierGpsSnapshotDocuments[0];
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

export const handleSupplierWorkHealthSafetyPolicyDocumentController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierWorkHealthSafetyPolicyDocuments = uploadedFiles.map(file => dynamicSupplierURL(SupplierComplianceDocuments.WorkHealthSafetyPolicy, file.filename));
            try {
                await Promise.all(supplierWorkHealthSafetyPolicyDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierWorkHealthSafetyPolicyDocuments[0];
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