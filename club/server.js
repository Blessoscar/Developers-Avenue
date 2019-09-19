const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// intialize tha app 
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB config
//const db = require('./config/key').mongoURI;

  //connect to MongoDB
mongoose.connect("mongodb://localhost/us", { useNewUrlParser: true })
  .then(() => console.log("connected to us  database "))
  .catch(err => console.log(`err is ${err}`))

  //mongoose.connect(db)
    //.then(() => console.log('MongoDB  connected'))
    //.catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));  