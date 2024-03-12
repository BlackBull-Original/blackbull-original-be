import { Request, Response } from "express";
import User from "../../pojos/auth/user";
import { signJWT, verifyJWT } from "../../services/auth";
import ROLE from "../../../helper/role";
import { sendMagicLinkService } from "../../services/email-services";
import { generateToken } from "../../../utils";
import { forgotPasswodSendMagicLinkService } from "../../services/auth/forgot-password-email";
const bcryptjs = require("bcryptjs");

export const AddUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, number, designation, companyName, profEmail, address, password } = req.body;
        console.log(req.body);

        if (!firstName || !lastName || !email || !number || !designation || !companyName || !profEmail || !address || !password) {
            return res.status(400).json({ success: false, message: "* All fields are required" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "* Email already exists" });
        }
        const existingNumber = await User.findOne({ number });
        if (existingNumber) {
            return res.status(400).json({ success: false, message: "* Number already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const saveUser = await User.create({ firstName, lastName, email, number, designation, companyName, profEmail, address, password: hashedPassword });
        console.log({ saveUser })

        // send magic link...
        await sendMagicLinkService(saveUser?.firstName, saveUser?.lastName, saveUser?.email, saveUser?.number, saveUser?.designation, saveUser?.companyName, saveUser?.profEmail, saveUser?.address);
        res.json(saveUser)
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        if (existingUser.role !== ROLE.Admin) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const checkPassword = await bcryptjs.compare(password, existingUser.password);
        if (!checkPassword) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        const payload = {
            user: {
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role,
                email: existingUser.email,
                expiresIn: process.env.LOGIN_EXPIRATION,
            },
        };
        console.log({ payload });
        const token = signJWT(payload);
        res.cookie('token', token, {
            httpOnly: false,
            // 7 days expiry...
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }).json({
            success: true,
            token,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const handleForgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email })
        console.log({ existingUser })
        if (!existingUser) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        const payload = {
            email: existingUser?.email
        }
        const token = signJWT(payload)
        console.log({ token })
        const resetLink = `http://localhost:3000/onboarding?token=${token}`;
        console.log({ resetLink })
        const info = await forgotPasswodSendMagicLinkService(existingUser?.email, resetLink)
        if (info) {
            console.log('Email sent:', { info });
            res.json({ token, message: "Password reset link has been sent to your email." });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const handleResetPasswordController = async (req: Request, res: Response) => {
    try {
        const token = req.body.token;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }
        try {
            const decoded = verifyJWT(token);
            const email = decoded.email;
            console.log("Decoded email", { email })

            const user = await User.findOne({ email });
            console.log("Existing user", { user })
            if (user) {
                const hashedPassword = await bcryptjs.hash(newPassword, 10);
                await User.updateOne({ email }, { password: hashedPassword });
                return res.status(200).json({ message: "Password has been updated successfully." });
            } else {
                return res.status(404).json({ error: "User not found." });
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            return res.status(400).json({ error: "Invalid or expired token." });
        }

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const handleLogoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logout successfully..." });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const CheckToken = async (req: Request, res: Response) => {
    res.json("Abid Husain....")
}