var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nodeblog";
var db = require("../models/posts.js");

function addCategories(req, res) {
    // Get Form Values
    var name = req.body.name;

    // Form Validation
    req.checkBody('name','Name field is required').notEmpty();

    // Check Errors
    var errors = req.validationErrors();

    if(errors){
        res.render('addpost',{
            "errors": errors
        });
    } else {
        mongo.connect(url, (error, dbo) => {
        if(error) console.error(error);
        console.log('Connected to the database succesfully');
        let db = dbo.db('categories');
        var myobj = {
           "name": name,
        };
        dbo.collection("categories").insertOne(myobj, function(err, res) {
            console.log("1 category inserted");
            if(err){
                res.send(err);
            } else {
                        req.flash('success','Category Added');
                        res.location('/');
                        res.redirect('/');
                   }
               });
           });
       }
}

module.exports = {
    addcategories : addCategories,
}
