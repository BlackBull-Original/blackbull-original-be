import SupplierVehicleModel from "../../pojos/supplier/supplier-vehicle";
import { SupplierVehicle } from "../../../type";


export const supplierVehicleService = async (data: SupplierVehicle, id: string) => {
    try {
        const response = await SupplierVehicleModel.create({ ...data, Admin: id });
        console.log({ response });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedSupplierVehicleServiceById = async (id: string) => {
    const response = await SupplierVehicleModel.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllSupplierVehicleService = async (id: string) => {
    return await SupplierVehicleModel.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteSupplierVehicleService = async (id: string) => {
    const response = await SupplierVehicleModel.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}