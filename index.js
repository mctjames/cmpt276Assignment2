const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
app.set('view engine', 'ejs');

let port = process.env.PORT;
if(port == null || port == ""){
  port = 8000;
}

//body parser middleware
app.use(bodyParser.json())
 // app.use(bodyParser.urlencoded({extended: true,}))
var urlencodedParser = bodyParser.urlencoded({extended:false});

//give path information to access the files in the piblic folder - the css and js stuff
app.use(express.static(path.join(__dirname, 'public')));



//database information
var mongoose = require('mongoose');
//connect to mongoose database
mongoose.connect("mongodb+srv://james:password12345@cluster0-mfucr.mongodb.net/test?retryWrites=true&w=majority", 
  {useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex: true});


//create a schema - the blueprint for our data
var tokiSchema = new mongoose.Schema({
  name: String,
  flying: Number,
  fighting: Number,
  fire: Number,
  water:Number,
  electric:Number,
  frozen:Number,
  total: Number,
  weight:Number,
  height:Number,
  trainer:String,
});


// created a modeled based on the above schema
var Tokimon = mongoose.model('Tokimon', tokiSchema);




// homepage request
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname +'/public/home.html'));
});

//add tokimon page
app.get('/todo', function(req, res){
  //get data from mongodb and pass to view
  //finds all the items in the collextion/database
  // to get a specific item .find({item: 'specific identifier'})
  Tokimon.find({}, function(err, data){
    if(err) throw err;
    res.render('todo', {tokimon: data});
  });
});

//functionality for add tokimon page
app.post('/todo', urlencodedParser, function(req,res){
  //get data from the view and add it to mongodb
  var newTodo = Tokimon(req.body).save(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});


//functionality for deleting tokimon
app.delete('/todo/:name', function(req,res){
  // delete the requested item from mongo
  Tokimon.find({name: req.params.name.replace(/\-/g, " ")}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});



//server 
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})




