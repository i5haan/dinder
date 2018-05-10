	'use strict';


	var tinder=document.querySelector(".tinder");
	var tinderDetail=document.querySelector(".tinder--detail");
	var tinderDetailCon=document.querySelector(".contain")
	var tinderContainer;
	var allCards;
	var nope;
	var love;

	function makeRequest(id)
	{
		console.log("hi")
		// 1. create a new XMLHttpRequest object -- an object like any other!
		var myRequest = new XMLHttpRequest();
		console.log('/api/friends/'+id)
		// 2. open the request and pass the HTTP method name and the resource as parameters
		myRequest.open('GET', '/api/friends/'+id);
		// 3. write a function that runs anytime the state of the AJAX request changes
		myRequest.onreadystatechange = function () 
		{ 
		    // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
		    if (myRequest.readyState === 4) 
		    {
		        // 5. insert the text sent by the server into the HTML of the 'ajax-content'
		        var d = JSON.parse(myRequest.responseText);
		        console.log(d);
		        document.querySelector("img.detail--photo").setAttribute("src",d.image);
		        document.querySelector("div.dog--desc").textContent=d.desc;
		        document.querySelector("h1.dog--name").textContent=d.name;
		        document.querySelector("div.dog--breed").textContent="Breed:"+d.breed;
		        document.querySelector("div.dog--weight").textContent="Weight:"+d.weight;
		        document.querySelector("div.dog--age").textContent="Age:"+d.age;
		        document.querySelector("div.dog--price").textContent="Adopt me for only Rs"+d.price;
	   		}
		};
		myRequest.send();
	};

	function initCards(card, index) {
	  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

	  newCards.forEach(function (card, index) {
	    card.style.zIndex = allCards.length - index;
	    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
	    card.style.opacity = (10 - index) / 10;
	  });
	  
	  tinderContainer.classList.add('loaded');
	}

	function start()
	{
		tinderContainer = document.querySelector('.tinder');
		allCards = document.querySelectorAll('.tinder--card');
		nope = document.getElementById('nope');
		love = document.getElementById('love');


		initCards();

		allCards.forEach(function (el) {
		  var hammertime = new Hammer(el);

		  hammertime.on('pan', function (event) {
		    el.classList.add('moving');
		  });

		  hammertime.on('pan', function (event) {
		    if (event.deltaX === 0) return;
		    if (event.center.x === 0 && event.center.y === 0) return;

		    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
		    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

		    var xMulti = event.deltaX * 0.03;
		    var yMulti = event.deltaY / 80;
		    var rotate = xMulti * yMulti;

		    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
		  });

		  hammertime.on('panend', function (event) {
		    el.classList.remove('moving');
		    tinderContainer.classList.remove('tinder_love');
		    tinderContainer.classList.remove('tinder_nope');

		    var moveOutWidth = document.body.clientWidth;
		    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

		    event.target.classList.toggle('removed', !keep);

		    if (keep) {
		      event.target.style.transform = '';
		    } else {
		      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
		      var toX = event.deltaX > 0 ? endX : -endX;
		      var endY = Math.abs(event.velocityY) * moveOutWidth;
		      var toY = event.deltaY > 0 ? endY : -endY;
		      var xMulti = event.deltaX * 0.03;
		      var yMulti = event.deltaY / 80;
		      var rotate = xMulti * yMulti;

		      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
		      initCards();
		    }
		    if(event.deltaX > 300)
		    {
		    	console.log("removed liked");

		    }
		    else if(event.deltaX<-300)
		    {
		    	console.log("removed disliked");
		    }
		  });

		  el.addEventListener("click",function()
			{
				console.log("Clicked!!");
				console.log(this.innerHTML);
				tinder.classList.toggle("hide");
				tinderDetail.classList.remove("hide");
				makeRequest(this.getAttribute("Value"));
			});
		});


	}

	tinderDetailCon.addEventListener("click",function()
		{

			console.log("Clicked!!");
			console.log(this.innerHTML);
			tinder.classList.toggle("hide");
			tinderDetail.classList.add("hide");
		});
		document.querySelector("html").addEventListener("keydown",function(event)
		{
			console.log(event);
			if(event.which==27)
			{
				console.log("Clicked!!");
				console.log(this.innerHTML);
				tinder.classList.remove("hide");
				tinderDetail.classList.add("hide");
			}
			
		});

	start();

	function createButtonListener(love) {
	  return function (event) {
	    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
	    var moveOutWidth = document.body.clientWidth * 1.5;

	    if (!cards.length) return false;

	    var card = cards[0];

	    card.classList.add('removed');

	    if (love) {
	      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
	    } else {
	      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
	    }

	    initCards();

	    event.preventDefault();
	  };
	}

	var nopeListener = createButtonListener(false);
	var loveListener = createButtonListener(true);

	nope.addEventListener('click', nopeListener);
	love.addEventListener('click', loveListener);



	document.querySelector(".buy--button").addEventListener("click",function(event)
		{
			event.stopPropagation();
		});

