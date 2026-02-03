import {sql} from "../config/db.js";



// CRUD OPERATIONS FOR PRODUCTS
export const getProducts = async (req, res) => {

    // Logic to get all products from the database
    try{ 
        
        console.log("Fetching products from database...");
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
      console.log("Error in fetching product by ID:", err.message);
      res.status(500).json({success:false, message:" internal Server Error"})

    }
}

export const createProduct = async (req, res) => {
    // Logic to create a product in the database
    const {name, price, image, description, category, stock} = req.body;

    if (!name || !price || !image){
        return res.status(400).json({success:false, message:"Please provide all required fields"});
    }

    try{
    const newProduct = await sql`INSERT INTO products (name, price, image, description, category, stock)
     VALUES (${name}, ${price}, ${image}, ${description || null}, ${category || null}, ${stock || 10})
     RETURNING *`;
     console.log("new product has been added:", newProduct)
     res.status(201).json({success:true, data:newProduct[0]});
    }catch(err){
        console.log("Error in creating product:", err.message);
        console.log("Error in creating product:", err.message);
         res.status(500).json({success:false, message:"Server Error"});

    }
}

export const updateProduct = async (req, res) => {
    // Logic to update a product in the database
    
    const {id} = req.params;
    const {name, price, image, description, category, stock} = req.body;


    try {
    const updatedProduct = await sql`UPDATE products
    SET name = ${name},
        price = ${price},
        image = ${image},
        description = ${description || null},
        category = ${category || null},
        stock = ${stock !== undefined ? stock : 10}
    WHERE id = ${id}
    RETURNING *
    `;
    if (updatedProduct.length === 0){
        return res.status(404).json({success:false, message:"Product not found"});
        
    }
        res.status(200).json({success:true, message:"Product updated successfully", data: updatedProduct[0]});
    } catch (error) {
        console.log("Error in updating product:", error.message);
        console.log("Error in updating product:", error.message);
        res.status(500).json({success:false, message:"Server Error"});
        
    }
    

    





}


export const deleteProduct = async (req, res) => {
    // Logic to delete a product from the database
  const {id} = req.params;

  try {
    const deletedProduct = await sql`DELETE FROM products WHERE id = ${id} RETURNING *`;
    
     if (deletedProduct.length === 0){
        return res.status(404).json({success:false, message:"Product not found"});
     }

     res.status(200).json({success:true, message:"Product deleted successfully"});

  } catch (error) {
     console.log("Error in deleting product:", error.message);
      res.status(500).json({success:false, message:"Server Error"});
  }
   
}



