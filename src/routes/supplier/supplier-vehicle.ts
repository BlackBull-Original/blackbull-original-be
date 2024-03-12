import { Request, Response, Router } from "express";
import { isAdmin } from "../../middlewares";
import { DeleteSupplierVehicleController, FetchedAllSupplierVehicleController, FetchedSupplierVehicleController, UpdateSupplierVehicleController, handleSupplierDocumentsController, handleSupplierRegoDocumentsController, handleSupplierVehicleController } from "../../controllers/supplier-controller/vehicle";
import { upload } from "../../../helper/multer";
import fs from 'fs';
import { dynamicEndpointForSupplier, dynamicSupplierURL } from "../../../utils";
import { SupplierComplianceDocuments } from "../../../helper/enum";


const routes = Router();

routes.post("/supplier-vehicle", isAdmin, handleSupplierVehicleController)
routes.get("/supplier-vehicle/:id", isAdmin, FetchedSupplierVehicleController)
routes.get("/supplier-vehicle", isAdmin, FetchedAllSupplierVehicleController)
routes.delete("/supplier-vehicle/:id", isAdmin, DeleteSupplierVehicleController)
routes.put("/supplier-vehicle/:id", isAdmin, UpdateSupplierVehicleController)

routes.post(dynamicEndpointForSupplier('vehicle-rego-documents'), handleSupplierRegoDocumentsController)
routes.post(dynamicEndpointForSupplier('vehicle-documents'), handleSupplierDocumentsController)


export default routes;
