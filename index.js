import express from "express"

const app = express();

app.use('/hello', (req, res) => {
    res.status(200).send({
        message: "Hello world!"
    })
});

app.use('/hai', (req, res) => {
    res.status(200).send({
        message: "Hai!"
    })
});

app.listen(3001, () => {
    console.log(`Server running on http://localhost:${3001}`)
})