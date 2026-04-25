import { Router } from "express";
import { logout, signin, signup } from "../controllers/auth.controller";

const authRouter=Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);

export default authRouter;