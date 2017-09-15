// make the variables for the ids 
var counterHTML = $("#counter");
var questionHTML = $("#question1");
var answer1HTML = $("#answer1");
var answer2HTML = $("#answer2");
var answer3HTML = $("#answer3");
var answer4HTML = $("#answer4");

//questions object 

var questions ={
	qAndA:[
		{
			question: "What day is it?", 
			correctAnswer: "monday"
		},
		{
			question: "What is your favorite color?",
			correctAnswer: "blue"
		},
		{
			question: "what color is the sky?",
			correctAnswer: "blue"
		},
		{
			question: "how many legs do you have?",
			correctAnswer: "2"
		}
		]
};

// lets make a countdown timer
var count = 2; // set the counter 
var startCounter; // call this to start the counter
var _theCounter;
counterHTML.html(count); 

// make the count go down by 1 every second
startCounter = function(){_theCounter = setInterval(CountingDown, 1000)}; 

//removes a value of 1 from the counter and updates the html
function CountingDown(){
	count--;
	counterHTML.html(count);
	if(count === 0){
		clearInterval(_theCounter);
	}

}

//start the counter 
startCounter();



