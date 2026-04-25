import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


export const signup = async (req: Request, res: Response) => {

    const { name, email, password, phone, role, username } = req.body;

    try {

        if (!name || !email || !password || !phone || !role || !username) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exist",
            })
        }

        const user = await User.create({
            name,
            username: username.toLowerCase(),
            email,
            phone,
            password: await bcrypt.hash(password, 10),
            role,
        })

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '7d' }
        )

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: user,
            token
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}