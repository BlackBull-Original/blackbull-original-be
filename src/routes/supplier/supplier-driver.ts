import { Router } from "express";
import { isAdmin } from "../../middlewares";
import { DeleteSupplierDriverController, FetchedAllSupplierDriverController, FetchedSupplierDriverController, UpdateSupplierDriverController, handleDriverCertificateController, handleDriverLicenseBackController, handleDriverLicenseFrontController, handleDriverVisaStatusController, handleDrugTestController, handleFitnessController, handleHealthInsurancCeontroller, handleLicenseHistoryController, handlePassportBackController, handlePassportFrontController, handlePoliceVerificationController, handleSupplierDriverController, handleSupplierDriverLicenseDocumentsController, handleSupplierDriverOnboardingDocumentsController, handleSupplierDriverProfileController } from "../../controllers/supplier-controller/driver";
import { dynamicEndpointForSupplierDriver } from "../../../utils";

const routes = Router();

routes.post("/supplier-driver", isAdmin, handleSupplierDriverController)
routes.get("/supplier-driver/:id", isAdmin, FetchedSupplierDriverController)
routes.get("/supplier-driver", isAdmin, FetchedAllSupplierDriverController)
routes.delete("/supplier-driver/:id", isAdmin, DeleteSupplierDriverController)
routes.put("/supplier-driver/:id", isAdmin, UpdateSupplierDriverController)

routes.post(dynamicEndpointForSupplierDriver('profile'), handleSupplierDriverProfileController)
routes.post(dynamicEndpointForSupplierDriver('license-documents'), handleSupplierDriverLicenseDocumentsController)
routes.post(dynamicEndpointForSupplierDriver('onboarding-documents'), handleSupplierDriverOnboardingDocumentsController)


// :::::::::::::::::::::::::::::::::::::::::::::: SUPPLIER DRIVER ONBOARDING DOCUMENTS ::::::::::::::::::::::::::::::::::::::::::::::
routes.post(dynamicEndpointForSupplierDriver('visa-status'), isAdmin, handleDriverVisaStatusController)
routes.post(dynamicEndpointForSupplierDriver('license-front'), isAdmin, handleDriverLicenseFrontController)
routes.post(dynamicEndpointForSupplierDriver('license-back'), isAdmin, handleDriverLicenseBackController)
routes.post(dynamicEndpointForSupplierDriver('lincese-history'), isAdmin, handleLicenseHistoryController)
routes.post(dynamicEndpointForSupplierDriver('police-verification'), isAdmin, handlePoliceVerificationController)
routes.post(dynamicEndpointForSupplierDriver('passport-front'), isAdmin, handlePassportFrontController)
routes.post(dynamicEndpointForSupplierDriver('passport-back'), isAdmin, handlePassportBackController)
routes.post(dynamicEndpointForSupplierDriver('health-insurance'), isAdmin, handleHealthInsurancCeontroller)
routes.post(dynamicEndpointForSupplierDriver('certificate'), isAdmin, handleDriverCertificateController)
routes.post(dynamicEndpointForSupplierDriver('fitness'), isAdmin, handleFitnessController)
routes.post(dynamicEndpointForSupplierDriver('drug-test'), isAdmin, handleDrugTestController)

export default routes;
