const express = require('express');
const conectDB = require('./config/db')
const cors = require('cors');
// Create server
const app = express();

// Conect to DB
conectDB();

// Enable express.json
app.use( express.json({ extended: true}));

// Enable cors
app.use(cors())

// App port
const port = process.env.port || 4000;

// Import Routes
app.use('/api/user', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));


// start app
app.listen(port,'0.0.0.0',()=>{
    console.log(`port is working on port ${port}`)
})