var mongoose=require("mongoose");

var dogSchema=new mongoose.Schema({
	image:String,
	name:String,
	desc:String,
	weight:String,
	age:String,
	breed:String,
	price:String
});


module.exports=mongoose.model("Dog",dogSchema);