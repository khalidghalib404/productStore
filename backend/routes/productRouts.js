import express from  "express";
import { getAllProducts } from "../routes/productController.js";
const router = express.Router();


router.get("/",  getAllProducts); 

router.post("/", createProduct);
router.get("/:id", getProductById);