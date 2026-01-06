import {sql} from "../config/db.js";

export const getProducts = async (req, res) => {
    // Logic to get all products from the database
    try{ 
       const products = await sql`SELECT * FROM products
       ORDER BY created_at DESC`;
       console.log("fetched products:", products);
       res.status(200).json({success:true, data:products});
    }catch(err){
        console.log("Error in fetching products:", err.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const getProduct = async (req, res) => {
    // Logic to get a product by ID from the database
    const {id} = req.params;

    try{
      const product = await sql`SELECT * FROM products WHERE id = ${id}`;
      res.status(200).json({success:true, data:product[0]});
    }catch(err){
      console.log("error in get the product function", err);
      res.status(500).json({success:false, message:" internal Server Error"})

    }
}

export const createProduct = async (req, res) => {
    // Logic to create a product in the database
    const {name,price,image} = req.body;

    if (!name || !price || !image){
        return res.status(500).json({success:false, message:"Please provide all required fields"}); 
    }

    try{
    const newProduct = await sql`INSERT INTO products (name, price, image) 
     VALUES (${name}, ${price}, ${image})
     RETURNING *`; 
     console.log("new product has been added:", newProduct)
     res.status(201).json({success:true, data:newProduct[0]}); 
    }catch(err){
        console.log("Error in creating product:", err.message);
         res.status(500).json({success:false, message:"Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    // Logic to update a product in the database
    
    const {id} = req.params;
    const {name,price,image} = req.body;
    

    





}


export const deleteProduct = async (req, res) => {
    // Logic to delete a product from the database
  
   
}

