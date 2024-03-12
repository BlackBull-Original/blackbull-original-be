import { Request, Response, Router } from "express";
import { AddUser, CheckToken, LoginUser, handleForgotPasswordController, handleLogoutController, handleResetPasswordController } from "../controllers/auth";
import { isAdmin } from "../middlewares";
import { DeleteOnboardingUserController, FetchedAllOnboardingUserController, OnboardingUserController, UpdateOnboardingUserController, handleOnboardingListByIdConrtoller } from "../controllers/auth/onboarding-user";
import { upload } from "../../helper/multer";
import fs from 'fs';

const routes = Router();

routes.post("/add-user", AddUser);
routes.post("/login", LoginUser)

// ======================================= FORGOT PASSWORD ======================================= 
routes.post("/forgot-password", handleForgotPasswordController)
routes.post("/reset-password", handleResetPasswordController)
routes.post("/logout", handleLogoutController)

routes.get("/check-token", isAdmin, CheckToken)

routes.post("/onboarding-user", isAdmin, OnboardingUserController);
routes.get("/onboarding-list/:id", isAdmin, handleOnboardingListByIdConrtoller);
routes.get("/onboarding-list", isAdmin, FetchedAllOnboardingUserController);
routes.delete("/onboarding-list/:id", isAdmin, DeleteOnboardingUserController);
routes.put("/onboarding-list/:id", isAdmin, UpdateOnboardingUserController);

routes.post('/onboarding-profile', (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error uploading files.' });
        }
        const uploadedFiles = req.files as Express.Multer.File[];
        const onboardingProfile = uploadedFiles.map(file => `${process.env.BASE_URL}/onboarding-profile/${file.filename}`);
        try {
            await Promise.all(onboardingProfile.map(async (filePath) => {
                console.log({ filePath });
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }));
            const url = onboardingProfile[0];
            return res.json({
                success: true,
                message: 'Files uploaded successfully.',
                response: url
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error handling files.' });
        }
    });
});

export default routes;

