const express = require('express');
const conectDB = require('./config/db')

// Create server
const app = express();

// Conect to DB
conectDB();

// App port
const PORT = process.env.PORT || 4000;



// start app
app.listen(PORT,()=>{
    console.log(`port is working on port ${PORT}`)
})