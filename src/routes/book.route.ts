import express, { Request, Response, Router } from "express";
import { addBooks, getBooks } from "../controllers/book.controller";


const bookRouter=Router();


bookRouter.get('/get-book',getBooks);
bookRouter.post('/add-book',addBooks);

export default bookRouter;