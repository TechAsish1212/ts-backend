import  {  Router } from "express";
import { addBooks, getBooks, updateBook } from "../controllers/book.controller";


const bookRouter=Router();


bookRouter.get('/get-book',getBooks);
bookRouter.post('/add-book',addBooks);
bookRouter.patch('/update-book/:id',updateBook);

export default bookRouter;