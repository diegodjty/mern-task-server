const express = require('express');
const conectDB = require('./config/db')

// Create server
const app = express();

// Conect to DB
conectDB();

// Enable express.json
app.use( express.json({ extended: true}));

// App port
const PORT = process.env.PORT || 4000;

// Import Routes
app.use('/api/user', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/task', require('./routes/task'));


// start app
app.listen(PORT,()=>{
    // console.log(`port is working on port ${PORT}`)
})