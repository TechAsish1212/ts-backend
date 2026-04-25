import e, { Request, Response } from "express";
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

        const isLowerCase = /^[a-z0-9_]+$/.test(username);

        if (!isLowerCase) {
            return res.status(400).json({
                success: false,
                message: "Username must be lowercase (a-z, 0-9, underscore only)"
            });
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



// signin

export const signin = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;

    try {

        if ((!username && !email) || !password) {
            return res.status(400).json({
                success: false,
                message: "Username or Email and password are required"
            })
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found. Please signup first"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '7d' }
        )

        return res.status(201).json({
            success: true,
            message: "Login Successfully",
            token,
            data: user
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}