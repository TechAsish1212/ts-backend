import { Request, Response } from "express";
import { Book } from "../models/Book";

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(201).json({
            success: true,
            data: books
        })
    } catch (error: any) {
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


export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, author, publishYear, description } = req.body;

        const updateData: any = {};

        if (name !== undefined) updateData.name = name;
        if (author !== undefined) updateData.author = author;
        if (publishYear !== undefined) updateData.publishYear = publishYear;
        if (description !== undefined) updateData.description = description;

        const book = await Book.findByIdAndUpdate(id, updateData, { new: true });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Update successful",
            data: book
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};