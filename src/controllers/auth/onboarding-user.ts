import { Request, Response } from "express";
import { DriverDetails, OnboardingUser } from "../../../type";
import OnboardingUserModel from "../../pojos/auth/onboarding-user";
import { DeleteDriverService, FetchedAllDriverService, FetchedDriverServiceById, driverService } from "../../services/driver-service";
import { isValidObjectId } from "mongoose";
const bcryptjs = require("bcryptjs");
import { DeleteOnboradingUserService, FetchedAllOnboradingUserService, FetchedOnboradingUserServiceById, onboradingUserService } from "../../services/onboarding-user";

export const OnboardingUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const onboardingUser: OnboardingUser = req.body;
        console.log({ onboardingUser })
        const checkIfExists = async (field: string, value: string, errorMessage: string) => {
            const existingRecord = await OnboardingUserModel.findOne({ [field]: value });
            return existingRecord ? errorMessage : null;
        };
        const errors = await Promise.all([
            checkIfExists('email', onboardingUser.email, "* Email already exists."),
            checkIfExists('mobile', onboardingUser.number, "* Mobile already exists."),
        ]);

        const hashedPassword = await bcryptjs.hash(onboardingUser?.password, 10);
        const hashedConfirmPassword = await bcryptjs.hash(onboardingUser?.password, 10);

        const customPayload = {
            ...onboardingUser,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        }

        const errorMessages = errors.filter(Boolean);
        if (errorMessages.length > 0) {
            return res.status(400).json({ success: false, messages: errorMessages });
        }
        const data = await onboradingUserService(customPayload, userId);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const handleOnboardingListByIdConrtoller = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await FetchedOnboradingUserServiceById(req.params.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const FetchedAllOnboardingUserController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const data = await FetchedAllOnboradingUserService(currentUser.id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const DeleteOnboardingUserController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await DeleteOnboradingUserService(id);
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const UpdateOnboardingUserController = async (req: Request, res: Response) => {
    try {
        const currentUser = req?.user;
        const onboardingUserUpdationData: OnboardingUser = req.body;
        if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
        const id = req.params.id;
        if (!id || !isValidObjectId(id)) return res.status(400).json({ error: "Invalid ID" });
        const data = await OnboardingUserModel.findByIdAndUpdate(
            id,
            onboardingUserUpdationData,
            { new: true }
        )
        if (!data) return res.status(404).json({ error: "Driver not found" });
        res.json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


