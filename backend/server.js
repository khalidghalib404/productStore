import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv" 
import productRoutes from "./routes/productRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;
console.log(PORT)
app.use(helmet());
app.use(express.json());
app.use(cors())
// delete this line after testing
app.use(morgan("common"));
app.use("/api/products", productRoutes);


app.get("/api/products", (req, res) => {
  // GET ALL THE PRODUCTS FORM DB
  res.status(200).json({
   
  })
})

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT  );
})

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 

