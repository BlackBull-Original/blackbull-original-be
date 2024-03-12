import { DriverDetails } from "../../../type";
import DriverModel from "../../pojos/driver";


export const driverService = async (data: DriverDetails, id: string) => {
    try {
        const response = await DriverModel.create({ ...data, Admin: id });
        console.log({ response });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedDriverServiceById = async (id: string) => {
    const response = await DriverModel.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllDriverService = async (id: string) => {
    return await DriverModel.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteDriverService = async (id: string) => {
    const response = await DriverModel.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}