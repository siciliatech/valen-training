import express from "express";
import itemRoutes from "./routes.js";

const app = express();
const PORT = 3000; 

app.use(express.json()); 

app.get("/", (req, res) => { 
    console.log("Test");
    res.send("Servidor funcionando"); 
});

app.use("/api", itemRoutes);

app.listen(PORT, () => { 
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 