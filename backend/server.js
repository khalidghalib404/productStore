import express, { request } from "express"
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
if(decision.results.some((results)=> results.reason.isBot()&&  result.reason.isSpoofed())){
  res.status(403).json({success:false, message:"Spoofed bot detected. Access denied."})
  return;
}
next();
}   
    catch(err){
console.log("error in arcjet middleware", err);
  
next(error)
  }
})

 
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



app.get("/api/products", (req, res) => {
  // GET ALL THE PRODUCTS FORM DB
  res.status(200).json({
   
  })
})


//after test delete this git

app.post("/api/products", async (req, res) => {
  // CREATE A NEW PRODUCT IN DB
  const { name, image, price } = req.body;
  if (!name || !image || !price) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }
  try {
    const result = await sql`
      INSERT INTO products (name, image, price)
      VALUES (${name}, ${image}, ${price})
      RETURNING *
    `;
    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    console.log("Error in create product", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


app.get("/api/products/:id", (req, res) => {
  // GET A SINGLE PRODUCT FROM DB
  res.status(200).json({

  })
})



// app.listen(PORT, () => {
//   console.log("Server is running on port " + PORT  );
// })



