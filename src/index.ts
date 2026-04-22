import express from 'express';
import type { Request, Response } from 'express';
import { config } from 'dotenv'
import cors from 'cors';

const app = express();
config()

const PORT = process.env.PORT;

// middleware
app.use(cors(
    {
        origin:process.env.HOST_URL || "*",
        
    }
));

app.get('/', (req:Request, res:Response) => {
    return res.send('Hiii everyone......');
})


app.listen(PORT, () => {
    console.log(`Server is started at:: https://localhost:${PORT}`)
})