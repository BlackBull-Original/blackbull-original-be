import { CustomerDetails, DriverDetails } from "../../../type";
import CustomerModel from "../../pojos/customer";


export const customerService = async (data: CustomerDetails, id: string) => {
    try {
        const response = await CustomerModel.create({ ...data, Admin: id });
        console.log({ response });
        return response;
    } catch (error: any) {
        console.log({ error });
    }
};

export const FetchedCustomerServiceById = async (id: string) => {
    const response = await CustomerModel.findById(id).select({ Admin: 0 });
    return response;
}

export const FetchedAllCustomerService = async (id: string) => {
    return await CustomerModel.find({ Admin: id }).select({ Admin: 0 })
}

export const DeleteCustomerService = async (id: string) => {
    const response = await CustomerModel.findByIdAndDelete(id).select({ Admin: 0 })
    return response;
}