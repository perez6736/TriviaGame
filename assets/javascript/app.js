// make the variables for the ids 
var counterHTML = $("#counter");
var questionHTML = $("#question1");
var answer1HTML = $("#answer0");
var answer2HTML = $("#answer1");
var answer3HTML = $("#answer2");
var answer4HTML = $("#answer3");

var correctGuess = 0;
var incorrectGuess = 0; 

//questions object 
var questions ={
	qAndA:[
		{
			question: "What day is it?", 
			correctAnswer: "monday",
			wrongAnswers: [
				"tuesday", "sunday", "friday"
			]
		},
		{
			question: "What is your favorite color?",
			correctAnswer: "blue",
			wrongAnswers: [
				"green", "red", "pink"
			]
		},
		{
			question: "what color is the sky?",
			correctAnswer: "skyblue",
			wrongAnswers: [
				"skygreen", "skyred", "skypink"
			]
		},
		{
			question: "how many legs do you have?",
			correctAnswer: "2",
			wrongAnswers: [
				"3", "1", "5"
			]

		}
		],

		//TODO -- make it so it displays each question once in a random order
		displayQuestionAndAnswers: function(){
			var randomQuestionIndex = Math.floor(Math.random() * this.qAndA.length); //gets a random number 0-length of qAndA's
			var randomQuestion = this.qAndA[randomQuestionIndex].question; //this is the random question 
			var theCorrectAnswer = this.qAndA[randomQuestionIndex].correctAnswer; // this is the correct answer for the question
			//chance.js for the win! we are changing the order of the wrong answers in the array so they dont show up in the same div
			var randomizedWrongAnswers = chance.shuffle(this.qAndA[randomQuestionIndex].wrongAnswers);
			var randomArr = []; // create an empty arr
			var theWrongAnswers;


			for (i=0; i<randomizedWrongAnswers.length + 1; i++){
				randomArr.push(i); 
			}

			randomArr = chance.shuffle(randomArr);

			for (i=0; i<randomizedWrongAnswers.length; i++){
				theWrongAnswers = randomizedWrongAnswers[i]; // the wrong answer is an index of the scrambled wrong answer array 

				$("#answer"+randomArr[i]).html(theWrongAnswers); // display the wrong answers to the html on a random div. 
				
			}
			$("#answer"+randomArr[randomArr.length-1]).html(theCorrectAnswer); //displays the correct answer on the left over div 
			questionHTML.html(randomQuestion); //display the question 

		},

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

questions.displayQuestionAndAnswers();
