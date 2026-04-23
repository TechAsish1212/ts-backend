import mongoose, { model, Schema } from "mongoose"

interface IUser {
    name: string,
    email: string,
    password: string,
    username: string,
    phone: string,
    booksAdded: string[],
    role: string
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['creator', 'visitor', 'admin'],
    },
    booksAdded: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],


}, { timestamps: true })


const User = model<IUser>('User', userSchema);

export { User }
export type { IUser }