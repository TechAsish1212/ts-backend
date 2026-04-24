import { Router } from "express";
import { addBooks, deleteBook, getBooks, updateBook } from "../controllers/book.controller";


const bookRouter = Router();


bookRouter.get('/get-book', getBooks);
bookRouter.post('/add-book', addBooks);
bookRouter.patch('/update-book/:id', updateBook);
bookRouter.delete('/delete-book/:id', deleteBook);

export default bookRouter;