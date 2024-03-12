import { Request, Response, Router } from "express";
import { AddCustomerController, DeleteCustomerController, FetchedAllCustomerController, FetchtedCustomerByIdController, UpdateCustomerController, handleCustomerContractualDocumentsController, handleCustomerProfileController } from "../../controllers/customer-controller";
import { isAdmin } from "../../middlewares";
import { dynamicEndpointForCustomer } from "../../../utils";

const routes = Router();

routes.post("/add-customer", isAdmin, AddCustomerController)
routes.get("/customer/:id", isAdmin, FetchtedCustomerByIdController)
routes.get("/customers", isAdmin, FetchedAllCustomerController)
routes.delete("/customer/:id", isAdmin, DeleteCustomerController)
routes.put("/customer/:id", isAdmin, UpdateCustomerController)

routes.post(dynamicEndpointForCustomer('profile'), handleCustomerProfileController)
routes.post(dynamicEndpointForCustomer('contractual-documents'), handleCustomerContractualDocumentsController)


export default routes;