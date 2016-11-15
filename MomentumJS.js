
console.log(localStorage);

//===============Background Image================

var url = "https://source.unsplash.com/1600x900/?nature,morning";
document.body.style.backgroundImage = "url" +"("+url+")"


// location function API call
var geoRequest = new XMLHttpRequest();
geoRequest.open("GET", "http://ipinfo.io/json");
geoRequest.onload = function() {
	geoObj = JSON.parse(geoRequest.responseText);
	var lat = geoObj.loc.substr(0, 7);
	var long = geoObj.loc.substr(8);


	// weather data API call
	var weatherRequest = new XMLHttpRequest();
	weatherRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=imperial&appid=332aac2b0595764b02d7634b86a9b463');
	weatherRequest.onload = function(){

		//Declaring Variables
		var weatherData = JSON.parse(weatherRequest.responseText);
		var temp = document.getElementById('temperature');
		var region = document.getElementById('region');
		var weatherIcon = document.getElementsByTagName('I')[0];
		var weatherCondition = weatherData.weather[0].main;
		  region.innerHTML  = weatherData.name; //'<h1></h1>'
		  temp.innerHTML = Math.round((weatherData.main.temp - 32) * 5/9) + " " + "&deg";

		  // Change Weather Icon Based on Weather Condition
		  switch (weatherCondition) {
		  	case "Clear":
		  	weatherIcon.className = "wi wi-day-sunny"
		  	break;
		  	case "Clouds":
		  	weatherIcon.className = "wi wi-day-cloudy"
		  	break;
		  	case "Rain":
		  	weatherIcon.className = "wi wi-day-rain"
		  	break;
		  	case "Snow":
		  	weatherIcon.className = "wi wi-day-snow"
		  	break;
		  	case "Thunderstorm":
		  	weatherIcon.className = "wi wi-day-thunderstorm"
		  	break;
		  	case "Drizzle":
		  	weatherIcon.className = "wi wi-day-showers"
		  	break;
		  }

		}
		weatherRequest.send();
	}

	geoRequest.send();



	//Time Implementation
var currentTime = document.getElementById('time');
var currentDate = document.getElementById('date');
	setInterval(function(){
		var time = new Date();
		var hours = time.getHours()
		var minutes = time.getMinutes();
		var seconds = time.getSeconds();

		var ampm = 'AM';

		var date = time.getDate();
		var month = time.getMonth();
		if(minutes < 10){
			minutes = '0' + minutes;
		}
		if(hours === 0){
			hours = 12;
		} else if(hours < 10){
			hours = '0' + hours;
		} else if(hours > 12){
			hours = hours - 12;
			ampm = 'PM';
		}

		var greeting = document.querySelector('#greeting');
		if(ampm === 'PM' && hours <= 5){
			greeting.innerText = 'Good Afternoon,';
		} else if(ampm === 'PM' && hours >= 5){
			greeting.innerText = 'Good Evening,';
		}

		currentTime.innerText = hours +':' + minutes + ' ' + ampm.toLowerCase();
		currentDate.innerText = month + '/' +date;
	}, 1000);

//Random Quote
var randomQuote = document.getElementById('randomQuote');
var author = document.querySelector('.quoteAuthor');
var quote = new XMLHttpRequest();
	quote.open('GET', 'http://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&' + new Date().getTime().toString());
	quote.onload = function(){
		var randomQuotes = JSON.parse(quote.responseText);
		console.log(randomQuotes);
		randomQuote.innerText = '"' + randomQuotes.quoteText + '"';
		author.innerText = '-' + randomQuotes.quoteAuthor;
	};

	quote.send();


//==============Basic ToDo Functionality=========
var input = document.querySelector('input');
var node = document.createElement('LI');
var todoInput = document.querySelector('ul');
var mainFocus = document.querySelector('#mainFocus');


if(localStorage.todo !== 'null'){ //if there is a todo
	mainFocus.innerText = 'Today\'s Goal: ';
	node.innerHTML = '<span class="doneTodo"><i class="fa fa-check-circle-o" aria-hidden="true"></i></span> '+localStorage.getItem("todo")+ '<span class="remove"> <i class="fa fa-times" aria-hidden="true"></i></span>';
	todoInput.appendChild(node);
	input.value = '';
	input.style.display = 'none';
	node.classList.remove('done');

	  var button = document.querySelector('.doneTodo');
	  button.addEventListener('click', function(){
		this.parentNode.classList.toggle('done');
	  });

		var remove = document.querySelector('.remove');
		remove.addEventListener('click', function(){
		node.parentNode.removeChild(node);
		localStorage.todo = 'null';
		mainFocus.innerText = 'What Is Your Main Focus For Today?';
		input.style.display = '';
		});
}


input.addEventListener('keypress', function(e){
	if(e.keyCode === 13){
		mainFocus.innerText = 'Today\'s Goal: ';
		localStorage.setItem('todo', input.value);
		node.innerHTML = '<span class="doneTodo"><i class="fa fa-check-circle-o" aria-hidden="true"></i></span> '+localStorage.getItem('todo')+' <span class="remove"> <i class="fa fa-times" aria-hidden="true"></i></span>';
		todoInput.appendChild(node);
		input.value = '';
		input.style.display = 'none';
		node.classList.remove('done');

				var button = document.querySelector('.doneTodo');
				button.addEventListener('click', function(){
					this.parentNode.classList.toggle('done');
				});

				var remove = document.querySelector('.remove');
				remove.addEventListener('click', function(){
					node.parentNode.removeChild(node);
					localStorage.todo = 'null';
					mainFocus.innerText = 'What Is Your Main Focus For Today?';
					input.style.display = '';
				});
    }
  });
