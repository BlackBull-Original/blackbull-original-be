import { Router } from 'express';
import { isAdmin } from '../../middlewares';
import { deleteSupplierByIdController, getAllSupplierController, getSupplierByIdController, handleSupplierAccreditationDocuments, handleSupplierAlcoholPolicyDocumentController, handleSupplierCocDocuments, handleSupplierComplianceDocumentsController, handleSupplierController, handleSupplierDocumentsController, handleSupplierDrugDocumentController, handleSupplierFatiquePolicyPresentationSystemDocumentController, handleSupplierGpsSnapshotDocumentController, handleSupplierMarineAlcoholDocuments, handleSupplierMarineDocuments, handleSupplierProcedureDocumentController, handleSupplierProductLiabilityDocuments, handleSupplierProfileController, handleSupplierPublicLiabilityDocuments, handleSupplierRiskManagementPolicyDocumentController, handleSupplierSpeedPolicyDocumentController, handleSupplierWorkCoverDocuments, handleSupplierWorkHealthSafetyPolicyDocumentController, updateSupplierByIdController } from '../../controllers/supplier-controller';
import { dynamicEndpointForSupplier } from '../../../utils';

const routes = Router();

routes.post("/add-supplier", isAdmin, handleSupplierController)
routes.get("/supplier/:id", isAdmin, getSupplierByIdController)
routes.get("/suppliers", isAdmin, getAllSupplierController)
routes.delete("/supplier/:id", isAdmin, deleteSupplierByIdController)
routes.put("/supplier/:id", isAdmin, updateSupplierByIdController)

routes.post(dynamicEndpointForSupplier('profile'), handleSupplierProfileController)
routes.post(dynamicEndpointForSupplier('accreditation-douments'), handleSupplierAccreditationDocuments)


// ==================================================== Insurance Documents =====================================================
routes.post(dynamicEndpointForSupplier('product-liability'), handleSupplierProductLiabilityDocuments)
routes.post(dynamicEndpointForSupplier('public-liability'), handleSupplierPublicLiabilityDocuments)
routes.post(dynamicEndpointForSupplier('work-cover'), handleSupplierWorkCoverDocuments)
routes.post(dynamicEndpointForSupplier('marine'), handleSupplierMarineDocuments)
routes.post(dynamicEndpointForSupplier('marine-alcohol'), handleSupplierMarineAlcoholDocuments)
routes.post(dynamicEndpointForSupplier('coc'), handleSupplierCocDocuments)



routes.post(dynamicEndpointForSupplier('compliance-documents'), handleSupplierComplianceDocumentsController)


// Supplier documenst
routes.post("/supplier-documents", isAdmin, handleSupplierDocumentsController)


//Compliance documents
routes.post(dynamicEndpointForSupplier('drug'), isAdmin, handleSupplierDrugDocumentController)
routes.post(dynamicEndpointForSupplier('alcohol-policy'), isAdmin, handleSupplierAlcoholPolicyDocumentController)
routes.post(dynamicEndpointForSupplier('procedure'), isAdmin, handleSupplierProcedureDocumentController)
routes.post(dynamicEndpointForSupplier('risk-management-policy'), isAdmin, handleSupplierRiskManagementPolicyDocumentController)
routes.post(dynamicEndpointForSupplier('speed-policy'), isAdmin, handleSupplierSpeedPolicyDocumentController)
routes.post(dynamicEndpointForSupplier('fatique-policy-presentation-system'), isAdmin, handleSupplierFatiquePolicyPresentationSystemDocumentController)
routes.post(dynamicEndpointForSupplier('gps-snapshot'), isAdmin, handleSupplierGpsSnapshotDocumentController)
routes.post(dynamicEndpointForSupplier('work-health-safety-policy'), isAdmin, handleSupplierWorkHealthSafetyPolicyDocumentController)

export default routes