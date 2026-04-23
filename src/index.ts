import express from 'express';
import type { Request, Response } from 'express';
import { config } from 'dotenv'
import cors from 'cors';
import routes from './routes/index';
import connectDB from './db/db';

const app = express();
config()

const PORT = process.env.PORT;

// DB connection
connectDB();

// middleware
app.use(cors(
    {
        origin:process.env.HOST_URL || "*",
        
    }
));
app.use(express.json())

app.use("/api",routes);


app.listen(PORT, () => {
    console.log(`Server is started at:: https://localhost:${PORT}`)
})