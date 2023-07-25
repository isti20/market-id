import express from "express"

const ROUTER = express.Router();

ROUTER.get('/hello', (req, res) => {
    res.status(200).send({
        message: "Hello world!"
    })
});

ROUTER.get('/hai', (req, res) => {
    res.status(200).send({
        message: "Hai!"
    })
});

export default ROUTER;