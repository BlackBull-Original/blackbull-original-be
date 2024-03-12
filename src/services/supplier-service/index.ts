import { SupplierTypes } from "../../../type/supplier";
import supplier from "../../pojos/supplier";


export const supplierService = async (data: SupplierTypes, id: string) => {
    try {
        const response = await supplier.create({ ...data, Admin: id });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedSupplierServiceById = async (id: string) => {
    const response = await supplier.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllSupplierService = async (id: string) => {
    return await supplier.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteSupplierService = async (id: string) => {
    const response = await supplier.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}