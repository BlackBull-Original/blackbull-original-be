import { SupplierDriverDetails } from "../../../type";
import supplierDriver from "../../pojos/supplier/supplier-driver";


export const supplierDriverService = async (data: SupplierDriverDetails, id: string) => {
    try {
        const response = await supplierDriver.create({ ...data, Admin: id });
        console.log({ response });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedSupplierDriverServiceById = async (id: string) => {
    const response = await supplierDriver.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllSupplierDriverService = async (id: string) => {
    return await supplierDriver.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteSupplierDriverService = async (id: string) => {
    const response = await supplierDriver.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}