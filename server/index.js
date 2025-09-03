const express= require('express');
const cors= require('cors');
const postRoutes=require('./route/endpoints');
const app=express();
const PORT=3002;

// middlewere

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json()); 
app.use('/api',postRoutes);

//Server starts

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})
