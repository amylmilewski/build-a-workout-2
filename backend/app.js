const express = require('express')
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const routineRoutes = require('./routes/routines');
const userRoutes = require('./routes/user');

const app = express();

// global middleware that fires for every request that comes in
app.use(cors()); // Enables CORS for all routes and origins
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// "registering routes" (attaches all routes from the express router to the end of the '/api/...' path)
app.use('/api/exercises', exerciseRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/user', userRoutes);

module.exports = app;