import { Router } from "express";
import { handleAddUser } from "../../controllers/superadmin";

const routes = Router();

routes.post("/add-user", handleAddUser);

export default routes