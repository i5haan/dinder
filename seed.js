var mongoose=require("mongoose");
var Dog=require("./models/Dog.js");
var request=require("request");
// mongoose.connect("mongodb://localhost/dinder");
var dogs=[];
var B=["Pomerian","Husky","German Sheperd","Pug","Bloodhound"]
function seedDb()
{
	Dog.remove({},function(err)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			for(var i=0;i<20;i++)
		{
			dog={};
			request("https://dog.ceo/api/breeds/image/random",function(e,r,b)
			{
				if(e || !r.statusCode==200)
				{
					console.log(e);
				}
				else
				{
					var data=JSON.parse(b);
					var d={
								image:data.message,
								name:"Cute Dog "+String(Math.floor(Math. random() * 100) + 1),
								desc:"I am a cute dog, adopt me!! I am from patiala",
								weight:String(Math.floor(Math.random()*20)+20),
								age:Math.floor(Math.random()*14),
								breed:B[Math.floor(Math.random()*5)],
								price:String(Math.floor(Math.random()*2000)+4000)
								};
					Dog.create(d,function(err,dog)
						{
							if(err)
							{
								console.log(error)
							}
							else
							{
								console.log(dog);
							}
						});
				}
			});
		};
		}
	});
}

module.exports=seedDb;



