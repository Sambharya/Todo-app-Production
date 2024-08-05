const express = require('express');
const app = express();
const cors = require('cors');
require("./conn/conn");

const path = require('path');
const auth = require('./routes/auth');
const list = require('./routes/list');

app.use(express.json());
app.use(cors());


app.use("/api/v1",auth);
app.use("/api/v2",list);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(1000,()=>{
    console.log('Server Started');
});