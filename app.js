const express = require('express')
const items = require("./fakeDb")
const itemRoutes = require('./itemRoutes')



const app = express()
app.use(express.json());

app.use('/items',itemRoutes)




// app.get('/items', (req, res)=>{
    
   
//    return res.json(items)

// })





app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });









module.exports = app;