var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Dog=require("./models/Dog.js");
var seedDB=require("./seed.js");


mongoose.connect("mongodb://localhost/dinder");

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.set(bodyParser.urlencoded({extended:true}));
// seedDB();

app.get("/",function(req,res)
	{
		res.render("index");
	});


app.get("/about",function(req,res)
	{
		res.render("about");
	});
app.get("/friends",function(req,res)
	{
		Dog.find({},function(err,dogs)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.render("friends/index",{dogs:dogs});
			}
		})
		
	});

app.get("/api/friends/:id",function(req,res)
	{
		Dog.findById(req.params.id,function(err,dog)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.send(JSON.stringify(dog));
				}
			});
	});

app.listen(3000,function()
	{
		console.log("Started Server")
	});
