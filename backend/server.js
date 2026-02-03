import express, { request } from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from "./routes/productRouts.js"
import { sql } from "./config/db.js"
import { aj } from "./lib/arcjet.js"

dotenv.config();





const app = express();
const PORT = process.env.PORT;
console.log(PORT)
app.use(helmet());// helmet is a security middleware that sets various HTTP headers to protect the app from common web vulnerabilities.
app.use(express.json());
app.use(cors())
app.use(morgan("dev"));//log the requests

//apply arcjet rate limit to all routes
app.use (async (req,res,next)=>{
  try{
    const decision = await aj.protect(req,{
       requested :1 // specipy that each  request consumes  1 token
  });

  if (decision.isDenied()){
    if(decision.reason.isRateLimit()){
      res.status(429).json({success:false, message:"Too many requests. Please try again later."});
  }else if(decision.reason.isBot()){
    res.status(403).json({success:false, message:"Bot detected. Access denied."})
}else{
  res.status(403).json({success:false, message:"Access denied."})
}
return;
}

//check for spoofed bots
if(decision.results.some((results)=> results.reason.isBot()&&  results.reason.isSpoofed())){
  res.status(403).json({success:false, message:"Spoofed bot detected. Access denied."})
  return;
}
next();
}
    catch(err){
console.log("error in arcjet middleware", err);
  
next(err)
  }
})

// Apply product routes after middleware
app.use("/api/products", productRoutes);

 
async  function  initDB(){
  try{
  await sql`CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
   
   // Alter existing table to add new columns if they don't exist
   try {
     await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT`;
     await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(100)`;
     await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0`;
     await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`;
     console.log("Table columns updated successfully");
   } catch(alterErr) {
     console.log("Columns already exist or error:", alterErr.message);
   }
   
   console.log("Database initialized successfully")
    console.log("DB connected successfully inside initDB")
    
  } catch(err){
    console.log("error initDB", err)
  }
}
initDB().then(()=>{
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT  );
    console.log("DB connected successfully")
    
  })
})





