import express from 'express';

const app = express();

const PORT = 2005;

app.get('/', (req, res) => {
    return res.send('Hiii everyone......');
})

app.get('/hi',(req,res)=>{
    return res.send("Hii Asish ");
})


app.listen(PORT, () => {
    console.log(`Server is started at:: https://localhost:${PORT}`)
})