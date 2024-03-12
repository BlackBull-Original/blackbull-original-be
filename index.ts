import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from 'express'
import { createServer } from "http";
require('dotenv').config();
const { databaseConnect } = require('./config/database');
import auth from "./src/routes/auth"
import vehicleRoutes from "./src/routes/vehicle"
import driverRoutes from "./src/routes/drivers"
import customerRoutes from "./src/routes/customer"
import supplierRoutes from "./src/routes/supplier/index"
import supplierVehicleRoutes from "./src/routes/supplier/supplier-vehicle"
import supplierDriverRoutes from "./src/routes/supplier/supplier-driver"
import superadminRoutes from "./src/routes/superadmin"
const mongoose = require('mongoose');
import path from "path";
import cors from "cors";

const app: Express = express();
const server = createServer(app);
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.ALLOWED_DOMAINS?.split(" "),
    optionsSuccessStatus: 200,
  })
);

mongoose.set('strictQuery', false);

require('dotenv').config({ path: '.env', override: true });

// Connect to the database
databaseConnect();

app.use('/vehicle-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-profile', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-license-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-onboarding-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/customer-profile', express.static(path.join(__dirname, 'uploads')));
app.use('/customer-contractual-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/onboarding-profile', express.static(path.join(__dirname, 'uploads')));


// supplier vehicle documents ... 
app.use('/supplier-vehicle-rego-documents', express.static(path.join(__dirname, 'uploads')));

// supplier driver documents ... 
app.use('/supplier-driver-license-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-profile', express.static(path.join(__dirname, 'uploads')));

// Supplier documents
app.use('/supplier-profile', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-drug', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-alcohol-policy', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-procedure', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-risk-management-policy', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-speed-policy', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-fatique-policy-presentation-system', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-gps-snapshot', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-work-health-safety-policy', express.static(path.join(__dirname, 'uploads')));


// Supplier driver onboarding documents
app.use('/supplier-driver-visa-status', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-license-front', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-license-back', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-license-history', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-police-verification', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-police-verification', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-passport-front', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-passport-back', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-health-insurance', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-certificate', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-fitness', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-drug-test', express.static(path.join(__dirname, 'uploads')));

app.use('/supplier-driver-onboarding-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-license-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-driver-profile', express.static(path.join(__dirname, 'uploads')));



// driver onboarding documents
app.use('/driver-visa-status', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-license-front', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-license-back', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-license-history', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-police-verification', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-police-verification', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-passport-front', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-passport-back', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-health-insurance', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-certificate', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-fitness', express.static(path.join(__dirname, 'uploads')));
app.use('/driver-drug-test', express.static(path.join(__dirname, 'uploads')));

// Middleware for JSON parsing
app.use(express.json());

// Middleware for logging (you can use morgan or other logging libraries)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/abid", (req: Request, res: Response) => {
  res.status(200).json({ name: "Abid Husain" });
});

app.use("/api", auth);
app.use("/api/v1", vehicleRoutes)
app.use("/api/d1", driverRoutes)
app.use("/api/c1", customerRoutes)
app.use("/api/s1", supplierRoutes)
app.use("/api/s1/v1", supplierVehicleRoutes)
app.use("/api/s1/d1", supplierDriverRoutes)



// >>>>>>>>>>>>>>>>>>>--------------------------------- SUPERADMIN ROUTES >>>>>>>>>>>>>>>>>>>---------------------------------
app.use("/api/superadmin", superadminRoutes)

server.listen(port, () => {
  console.log(`Server Runnig 🚀 @ http://localhost:${port}`);
});

app.use('/supplier-vehicle-documents', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-accreditation-douments', express.static(path.join(__dirname, 'uploads')));

app.use('/supplier-product-liability', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-public-liability', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-work-cover', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-marine', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-marine-alcohol', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-coc', express.static(path.join(__dirname, 'uploads')));
app.use('/supplier-compliance-documents', express.static(path.join(__dirname, 'uploads')));

