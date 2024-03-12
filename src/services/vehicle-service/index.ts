import { VehicleDetails } from "../../../type";
import VehicleModel from "../../pojos/vehicle";

export const vehicleService = async (data: VehicleDetails, id: string) => {
    try {
        const response = await VehicleModel.create({ ...data, Admin: id });
        console.log({ response });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedVehicleServiceById = async (id: string) => {
    const response = await VehicleModel.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllVehicleService = async (id: string) => {
    return await VehicleModel.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteVehicleService = async (id: string) => {
    const response = await VehicleModel.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}



