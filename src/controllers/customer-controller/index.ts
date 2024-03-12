import { Request, Response } from "express";
import { CustomerDetails } from "../../../type";
import CustomerModel from "../../pojos/customer"
import { DeleteCustomerService, FetchedAllCustomerService, FetchedCustomerServiceById, customerService } from "../../services/customer-service";
import { isValidObjectId } from "mongoose";
import { dynamicCustomerURL } from "../../../utils";
import { upload } from "../../../helper/multer";
import { CustomerDocuments } from "../../../helper/enum";
import fs from "fs"

export const AddCustomerController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const customer: CustomerDetails = req.body;
        console.log({ customer })
        const checkIfExists = async (field: string, value: string, errorMessage: string) => {
            const existingRecord = await CustomerModel.findOne({ [field]: value });
            return existingRecord ? errorMessage : null;
        };
        const errors = await Promise.all([
            checkIfExists('abnNumber', customer.abnNumber, "* ABN number already exists.")
        ]);
        const errorMessages = errors.filter(Boolean);
        if (errorMessages.length > 0) {
            return res.status(400).json({ success: false, messages: errorMessages });
        }
        const data = await customerService(customer, userId);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchtedCustomerByIdController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await FetchedCustomerServiceById(req.params.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchedAllCustomerController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const data = await FetchedAllCustomerService(currentUser.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const DeleteCustomerController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DeleteCustomerService(id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateCustomerController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        const CustomerDataForUpdate: CustomerDetails = req.body;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await CustomerModel.findByIdAndUpdate(
            id,
            CustomerDataForUpdate,
            { new: true }
        )
        if (!data) return res.status(404).json({ error: "Driver not found" });
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const handleCustomerProfileController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverProfile = uploadedFiles.map(file => dynamicCustomerURL(CustomerDocuments.Profile, file.filename));
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

export const handleCustomerContractualDocumentsController = async (req: Request, res: Response) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error uploading files.' });
            }
            const uploadedFiles = req.files as Express.Multer.File[];
            const driverLicenseDocuments = uploadedFiles.map(file => dynamicCustomerURL(CustomerDocuments.ContractualDocuments, file.filename));
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