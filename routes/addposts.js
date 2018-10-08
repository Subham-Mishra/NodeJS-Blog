var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nodeblog";
var db = require("../models/posts.js");
var multer = require('multer');
var upload = multer({ dest: './public/images' });

function addPosts(req, res) {
  // Get Form Values
  var title = req.body.title;
  var category= req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();

  // Check Image Upload
  if(req.file){
  	var mainimage = req.file.filename
  } else {
  	var mainimage = 'noimage.jpg';
  }

  	// Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	var errors = req.validationErrors();

	if(errors){
                res.render('addpost',{"errors": errors});
              } 
    else {
            mongo.connect(url, (error, dbo) => {
            if(error) console.error(error);
            console.log('Connected to the database succesfully');
            let db = dbo.db('nodeblog');
            var myobj = {
                "title": title,
                "body": body,
                "category": category,
                "date": date,
                "author": author,
                "mainimage": mainimage
                 };
            dbo.collection("customers").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                res.location('/');
                res.redirect('/');
                db.close();
            });
        });
    }	
}

module.exports = {
    addposts : addPosts,
}