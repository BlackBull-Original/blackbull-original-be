import { Request, Response, Router } from "express";
import { DeleteDriverController, DriverController, FetchedAllDriverController, FetchedDriverController, UpdateDriverController, handleDriverCertificateController, handleDriverLicenseBackController, handleDriverLicenseDocumentsController, handleDriverLicenseFrontController, handleDriverOnboardingDocumentsController, handleDriverProfileController, handleDriverVisaStatusController, handleDrugTestController, handleFitnessController, handleHealthInsurancCeontroller, handleLicenseHistoryController, handlePassportBackController, handlePassportFrontController, handlePoliceVerificationController } from "../../controllers/driver-controller";
import { isAdmin } from "../../middlewares";
import { upload } from "../../../helper/multer";
import fs from 'fs';
import { dynamicEndpointForDriver } from "../../../utils";


const routes = Router();

routes.post("/add-driver", isAdmin, DriverController)
routes.get("/driver/:id", isAdmin, FetchedDriverController)
routes.get("/drivers", isAdmin, FetchedAllDriverController)
routes.delete("/driver/:id", isAdmin, DeleteDriverController)
routes.put("/driver/:id", isAdmin, UpdateDriverController)

//Driver profile ...
routes.post(dynamicEndpointForDriver('profile'), handleDriverProfileController)
routes.post(dynamicEndpointForDriver('license-documents'), handleDriverLicenseDocumentsController)

routes.post(dynamicEndpointForDriver('onboarding-documents'), handleDriverOnboardingDocumentsController)


// :::::::::::::::::::::::::::::::::::::::::::::: DRIVER ONBOARDING DOCUMENTS ::::::::::::::::::::::::::::::::::::::::::::::
routes.post(dynamicEndpointForDriver('visa-status'), isAdmin, handleDriverVisaStatusController)
routes.post(dynamicEndpointForDriver('license-front'), isAdmin, handleDriverLicenseFrontController)
routes.post(dynamicEndpointForDriver('license-back'), isAdmin, handleDriverLicenseBackController)
routes.post(dynamicEndpointForDriver('lincese-history'), isAdmin, handleLicenseHistoryController)
routes.post(dynamicEndpointForDriver('police-verification'), isAdmin, handlePoliceVerificationController)
routes.post(dynamicEndpointForDriver('passport-front'), isAdmin, handlePassportFrontController)
routes.post(dynamicEndpointForDriver('passport-back'), isAdmin, handlePassportBackController)
routes.post(dynamicEndpointForDriver('health-insurance'), isAdmin, handleHealthInsurancCeontroller)
routes.post(dynamicEndpointForDriver('certificate'), isAdmin, handleDriverCertificateController)
routes.post(dynamicEndpointForDriver('fitness'), isAdmin, handleFitnessController)
routes.post(dynamicEndpointForDriver('drug-test'), isAdmin, handleDrugTestController)


export default routes;