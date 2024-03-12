const crypto = require('crypto')

export const dynamicSupplierURL = (type: string, filename: string) => {
    return `${process.env.BASE_URL}/supplier-${type}/${filename}`;
};

export const dynamicSupplierVehicleURL = (type: string, filename: string) => {
    return `${process.env.BASE_URL}/supplier-vehicle-${type}/${filename}`;
};

export const dynamicSupplierDriverURL = (type: string, filename: string) => {
    return `${process.env.BASE_URL}/supplier-driver-${type}/${filename}`;
};

export const dynamicDriverURL = (type: string, filename: string) => {
    return `${process.env.BASE_URL}/driver-${type}/${filename}`;
};

export const dynamicCustomerURL = (type: string, filename: string) => {
    return `${process.env.BASE_URL}/customer-${type}/${filename}`;
};

export const dynamicEndpointForSupplier = (type: string) => {
    return `/supplier-${type}`;
};

export const dynamicEndpointForDriver = (type: string) => {
    return `/driver-${type}`;
};

export const dynamicEndpointForCustomer = (type: string) => {
    return `/customer-${type}`;
};

export const dynamicEndpointForSupplierDriver = (type: string) => {
    return `/supplier-driver-${type}`;
};

export const generateToken = (email: any) => {
    const timestamp = Date.now().toString();
    const secret = process.env.JWT_SECRET_KEY;
    return crypto.createHmac('sha256', secret).update(email + timestamp).digest('hex');
};