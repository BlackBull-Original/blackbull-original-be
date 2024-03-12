import { Request, Response, Router } from "express";
import { DeleteVehicleController, FetchedAllVehicleController, FetchedVehicleController, UpdateVehicleController, VehicleController, handleVehicleDocumentsController } from "../../controllers/vehicle-controller";
import { isAdmin } from "../../middlewares";
import fs from 'fs';
import { upload } from "../../../helper/multer";


const routes = Router();

routes.post("/add-vehicle", isAdmin, VehicleController)
routes.get("/vehicle/:id", isAdmin, FetchedVehicleController)
routes.get("/vehicle", isAdmin, FetchedAllVehicleController)

routes.delete("/vehicle/:id", isAdmin, DeleteVehicleController)
routes.put("/vehicle/:id", isAdmin, UpdateVehicleController)
routes.post("/vehicle-documents", handleVehicleDocumentsController)


routes.post('/upload', (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error uploading files.' });
        }
        const uploadedFiles = req.files as Express.Multer.File[];
        const vehicle = uploadedFiles.map(file => `${process.env.BASE_URL}/vehicle-documents/${file.filename}`);
        try {
            await Promise.all(vehicle.map(async (filePath) => {
                console.log({ filePath });
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }));
            const url = vehicle[0];
            return res.json({
                success: true,
                message: 'Files uploaded successfully.',
                response: url
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error handling files.' });
        }
    });
});

export default routes;
