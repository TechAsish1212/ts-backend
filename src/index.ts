import express from 'express';

const app = express();

const PORT = 2005;

app.get('/', (req, res) => {
    return res.send('Hiii......');
})


app.listen(PORT, () => {
    console.log(`Server is started at:: https://localhost:${PORT}`)
})