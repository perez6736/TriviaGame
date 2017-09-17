// make the variables for the HTML stuff
var counterHTML = $("#counter");
var questionHTML = $("#question1");
var answer1HTML = $("#answer0");
var answer2HTML = $("#answer1");
var answer3HTML = $("#answer2");
var answer4HTML = $("#answer3");
var startHTML = $("#start");
var scoreCorrectHTML = $("#score-correct");
var scoreIncorrectHTML = $("#score-incorrect");
var startAgainHTML = $("#start-again");
var startAgainContainerHTML = $(".startAgain-container");
var scoreContainerHTML = $(".score-container");
var answersClassHTML = $(".answer");
var questionClassHTML = $(".question");
var counterClassHTML = $(".counter-container");

var correctGuess = 0;
var incorrectGuess = 0; 
var questionOrder = [];
var currentQuestion = 0;

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

		// made this function in order to call and randomize the question order and where the answer show up. 
		displayQuestionAndAnswers: function(QuestionIndex){
			if(QuestionIndex === questions.qAndA.length){
				hideAnswersQuestionsCounters();
				showScore();
			}
			else{
				var randomQuestion = this.qAndA[QuestionIndex].question; //this is the random question 
				var theCorrectAnswer = this.qAndA[QuestionIndex].correctAnswer; // this is the correct answer for the question
				var WrongAnswers = this.qAndA[QuestionIndex].wrongAnswers;
				var randomDivForAnswersArr = []; // create an empty arr
				var theWrongAnswer; // variable to hold a single wrong answer. 

				makeRandomArray(WrongAnswers.length+1, randomDivForAnswersArr); // need to add one to make room for the correct answer too.
				randomDivForAnswersArr = chance.shuffle(randomDivForAnswersArr); //shuffle that array up 

				for (i=0; i<WrongAnswers.length; i++){
					theWrongAnswer = WrongAnswers[i]; // the wrong answer is an index of the scrambled wrong answer array 

					$("#answer"+randomDivForAnswersArr[i]).html(theWrongAnswer); // display the wrong answers to the html on a random div. 
					$("#answer"+randomDivForAnswersArr[i]).attr("value", "wrong");
				}
				$("#answer"+randomDivForAnswersArr[randomDivForAnswersArr.length-1]).html(theCorrectAnswer); //displays the correct answer on the left over div 
				$("#answer"+randomDivForAnswersArr[randomDivForAnswersArr.length-1]).attr("value", "correct");
				questionHTML.html(randomQuestion); //display the question 
				}
		},
};


// lets make a countdown timer
var count = 5; // set the counter 
var startCounter; // call this to start the counter
var _theCounter;
counterHTML.html(count); 

// make the count go down by 1 every second
startCounter = function(){_theCounter = setInterval(CountingDown, 1000)}; 

//removes a value of 1 from the counter and updates the html
function CountingDown(){
	count--;
	counterHTML.html(count);
	if(count <= 0){
		count = 0;
		counterHTML.html(count); 
		clearInterval(_theCounter);
	}

}

function startGame(){
	//detach start button
	$(".start-button").detach();
	//show the counter, question and answers 
	$(".answer").show();
	$(".question").show();
	$(".counter-container").show();

	// start the counter
	startCounter();

	//make the questions come up in a random order each game. 
	makeRandomArray(questions.qAndA.length, questionOrder);
	questionOrder = chance.shuffle(questionOrder);
	questions.displayQuestionAndAnswers(currentQuestion); // display the first question. 
}

//hide all divs initially 
function hideAnswersQuestionsCounters(){
	answersClassHTML.hide();
	questionClassHTML.hide();
	counterClassHTML.hide();
}

function hideScore(){
	startAgainContainerHTML.hide();
	scoreContainerHTML.hide();

}

function showScore(){
	startAgainContainerHTML.show();
	scoreContainerHTML.show();	
	scoreCorrectHTML.html("Correct answers: " + correctGuess);
	scoreIncorrectHTML.html("Incorrect answers: " + incorrectGuess);

}

//function takes an array length and an array and puts 0-length of array in a new array. 
function makeRandomArray(arrayLength, randomArray){ 
	for (i=0; i<arrayLength; i++){
		randomArray.push(i); 
	}
}

function resetCounter(){
	count = 5;
}



// Game starts here ------------------------------------------------------------------------------

hideAnswersQuestionsCounters();
hideScore();
// clicking starts runs the startGame function
startHTML.on("click", startGame);

startAgainHTML.on("click", function(){ // if the user wants to play again we must reset stats from previous iteration 
	correctGuess = 0;
	incorrectGuess = 0; 
	questionOrder = [];
	currentQuestion = 0;
	resetCounter();
	hideScore();
	startGame();
});

//clicking on an answer 
answersClassHTML.on("click", function(e){
	var answerResult = $(this).children("div").attr("value"); // result of the answer he clicked 
	if(answerResult === "correct"){ //if user clicked correct answer
		correctGuess++; //add to score
		currentQuestion++; //set the variable so it can be passed in displayQuestionAndAnswers
		questions.displayQuestionAndAnswers(currentQuestion);
		resetCounter(); // reset counter 
	
	}
	else{
		incorrectGuess++; //add to score
		currentQuestion++;
		questions.displayQuestionAndAnswers(currentQuestion);
		resetCounter();
	}
})

//make it so when the count hits zero you get plus 1 on the incorrect answers and it goes to the next question. 