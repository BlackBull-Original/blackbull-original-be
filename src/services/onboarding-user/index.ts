import { DriverDetails, OnboardingUser } from "../../../type";
import onboardingUser from "../../pojos/auth/onboarding-user";
import DriverModel from "../../pojos/driver";


export const onboradingUserService = async (data: OnboardingUser, id: string) => {
    try {
        const response = await onboardingUser.create({ ...data, Admin: id });
        console.log({ response });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedOnboradingUserServiceById = async (id: string) => {
    const response = await onboardingUser.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllOnboradingUserService = async (id: string) => {
    return await onboardingUser.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteOnboradingUserService = async (id: string) => {
    const response = await onboardingUser.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}