const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chartRoutes = require('./routes/charts');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');

    next();

})


app.use(cors()); 
app.use(bodyParser.json());
app.use('/api/charts', chartRoutes); 
app.use('/api/auth', authRoutes); 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});