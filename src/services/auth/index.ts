import User from "../../pojos/auth/user";
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const signJWT = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as any, {
        expiresIn: "24h",
    });
};

export const verifyJWT = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as any);
};

//DECODE JWT
export const decodeJWT = (token: string) => {
    // console.log("Decoded token", jwt.decode(token))
    return jwt.decode(token);
};

export const userService = async (
    firstName: string,
    lastName: string,
    email: string,
    number: string,
    designation: string,
    companyName: string,
    profEmail: string,
    address: string,
    password: string
) => {

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userAuthPayload = {
        firstName,
        lastName,
        email,
        number,
        designation,
        companyName,
        profEmail,
        address,
        password: hashedPassword
    }

    const newUser = new User({
        ...userAuthPayload
    })

    await newUser.save();
    return newUser;
}