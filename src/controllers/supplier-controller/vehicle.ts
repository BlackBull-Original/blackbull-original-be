import { Request, Response } from "express";
import { SupplierVehicle } from "../../../type";
import SupplierVehicleModel from "../../pojos/supplier/supplier-vehicle";
import { DeleteSupplierVehicleService, FetchedAllSupplierVehicleService, FetchedSupplierVehicleServiceById, supplierVehicleService } from "../../services/supplier-service/supplier-vehicle";
import { isValidObjectId } from "mongoose";
import { dynamicSupplierVehicleURL } from "../../../utils";
import { SupplierComplianceDocuments } from "../../../helper/enum";
import { upload } from "../../../helper/multer";
import fs from "fs"

export const handleSupplierVehicleController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const vehicle: SupplierVehicle = req.body;
        console.log({ vehicle });
        const checkIfExists = async (field: string, value: string, errorMessage: string) => {
            const existingRecord = await SupplierVehicleModel.findOne({ [field]: value });
            return existingRecord ? errorMessage : null;
        };
        const errors = await Promise.all([
            checkIfExists('registrationNumber', vehicle.registrationNumber, "* Registration number already exists."),
            checkIfExists('vinNumber', vehicle.vinNumber, "* Vin number already exists."),
            checkIfExists('engineNumber', vehicle.engineNumber, "* Engine number already exists."),
            checkIfExists('policyNumber', vehicle.policyNumber, "* Policy number already exists."),
        ]);
        const errorMessages = errors.filter(Boolean);
        if (errorMessages.length > 0) {
            return res.status(400).json({ success: false, messages: errorMessages });
        }
        const data = await supplierVehicleService(vehicle, userId);
        res.json({ data });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchedSupplierVehicleController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await FetchedSupplierVehicleServiceById(req.params.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const FetchedAllSupplierVehicleController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const data = await FetchedAllSupplierVehicleService(currentUser.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const DeleteSupplierVehicleController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DeleteSupplierVehicleService(id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateSupplierVehicleController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        const SupplierVehicleDataForUpdate: SupplierVehicle = req.body;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await SupplierVehicleModel.findByIdAndUpdate(
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

export const handleSupplierRegoDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierVehicleRegoDocuments = uploadedFiles.map(file => dynamicSupplierVehicleURL(SupplierComplianceDocuments.RegoDocuments, file.filename));
            try {
                await Promise.all(supplierVehicleRegoDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierVehicleRegoDocuments[0];
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

export const handleSupplierDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const supplierVehicleRegoDocuments = uploadedFiles.map(file => dynamicSupplierVehicleURL(SupplierComplianceDocuments.Documents, file.filename));
            try {
                await Promise.all(supplierVehicleRegoDocuments.map(async (filePath) => {
                    console.log({ filePath });
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }));
                const url = supplierVehicleRegoDocuments[0];
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
