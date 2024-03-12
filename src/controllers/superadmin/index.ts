import { Request, Response } from "express";
import SuperadminUser from "../../pojos/superadmin/user";
const bcryptjs = require("bcryptjs");

export const handleAddUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, number, designation, companyName, profEmail, address, password } = req.body;
        console.log(req.body);

        if (!firstName || !lastName || !email || !number || !designation || !companyName || !profEmail || !address || !password) {
            return res.status(400).json({ success: false, message: "* All fields are required" });
        }
        const existingEmail = await SuperadminUser.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "* Email already exists" });
        }
        const existingNumber = await SuperadminUser.findOne({ number });
        if (existingNumber) {
            return res.status(400).json({ success: false, message: "* Number already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const saveUser = await SuperadminUser.create({ firstName, lastName, email, number, designation, companyName, profEmail, address, password: hashedPassword });
        console.log({ saveUser })

        // send magic link...
        // await sendMagicLinkService(saveUser?.firstName, saveUser?.lastName, saveUser?.email, saveUser?.number, saveUser?.designation, saveUser?.companyName, saveUser?.profEmail, saveUser?.address);
        res.json(saveUser)
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}