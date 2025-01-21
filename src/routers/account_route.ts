import { Router } from "express";
import * as account_controller from "../controllers/anggota_controller"
const account_route = Router();


account_route.get("/", account_controller.getAllAccount);

account_route.post("/", account_controller.getAccountByNIK);

account_route.post("/create", account_controller.createAccount);



export default account_route;