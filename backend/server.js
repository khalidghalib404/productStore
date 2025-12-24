import express from "express"
import helmet from "helmet"
import morgan from "morgan"

const app = express();
app.use(helmet());

app.get("/test", (req, res) => {
  console.log(res.getHeaders())
  res.send("Hello World");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})