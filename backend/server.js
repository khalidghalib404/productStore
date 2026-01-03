import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from "./routes/productRouts.js"
import { sql } from "./config/db.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;
console.log(PORT)
app.use(helmet());// helmet is a security middleware that sets various HTTP headers to protect the app from common web vulnerabilities.
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));//log the requests  
app.use("/api/products", productRoutes); 

 
async  function  initDB(){
  try{
  await sql`CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL, 
  created_at  Timestamp DEFAULT CURRENT_TIMESTAMP 
  )
  
  
   `;
   console.log("Database initialized successfully")
  } catch(err){
    console.log("error initDB", err)
  }
}
initDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT  );
  })
})



app.get("/api/products", (req, res) => {
  // GET ALL THE PRODUCTS FORM DB
  res.status(200).json({
   
  })
})

// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT  );
// })



