import express from  "express";

const router = express.Router();


router.get("/", (req, res) =>{
    res.send("Get all products");
})

router.post("/", (req, res) =>{
    res.send("Get all products");
})