import { Router } from "express";
import account_route from "./account_route"
import book_route from "./book_route";
import categories_route from "./categories_route";
const Mainrouter = Router();

Mainrouter.use("/account", account_route)

Mainrouter.use("/book", book_route)

Mainrouter.use("/categories", categories_route)
export default Mainrouter