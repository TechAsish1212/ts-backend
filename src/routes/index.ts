import { Router } from "express";
import bookRouter from "./book.route";

const routes=Router();


routes.use('/book',bookRouter)

export default routes;