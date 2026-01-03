import express from  "express";
import { getAllProducts, getProductById, createProduct } from "../Controllers/productController.js";
const router = express.Router();


router.get("/",  getAllProducts); 

router.post("/", createProduct);
router.get("/:id", getProductById);

export default router;
