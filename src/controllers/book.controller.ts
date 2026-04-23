import { Request, Response } from "express";
import { Book } from "../models/Book";

export const getBooks = async(req: Request, res: Response) => {
    try {
        const books=await Book.find().sort({createdAt:-1});
        return res.status(201).json({
            success:true,
            data:books
        })
    } catch (error:any) {
        return res.status(500).json({ success: false, error: error.messsage })
    }
}


export const addBooks = async (req: Request, res: Response) => {
    const { name, author, publishYear, description } = req.body;

    try {
        if (!name || !author || !publishYear || !description) {
            return res.status(404).json({ success: false, message: "All fields are required to add book" });
        }

        const book = await Book.create({
            name,
            author,
            publishYear,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Book added successfully.",
            data: book
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }



}
