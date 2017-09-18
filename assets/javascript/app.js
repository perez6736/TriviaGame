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
var correctAnswerContainerHTML = $(".correct-answer-container");
var correctAnswerHTML = $("#correct-answer");

var correctGuess = 0;
var incorrectGuess = 0; 
var questionOrder = [];
var currentQuestion = 0;

//questions object 
var questions ={
	qAndA:[
		{
			question: "Who was the shortest player ever to play in the NBA?", 
			correctAnswer: "Tyrone Bogues",
			wrongAnswers: [
				"LeBron James", "Muggsy Bogues", "Charles Barkley"
			]
		},
		{
			question: "What male tennis player has won the most Grand Slam titles?",
			correctAnswer: "Roger Federer",
			wrongAnswers: [
				"Rafael Nadel", "Novak Djokovic", "Andy Murray"
			]
		},
		{
			question: "Who was the last professional hockey player to play without a helmet?",
			correctAnswer: "Craig MacTavish",
			wrongAnswers: [
				"Jaromir Jagr", "Ilya Kovalchuk", "Wayne Gretzky"
			]
		},
		{
			question: "How many holes are there in a full round of golf?",
			correctAnswer: "18",
			wrongAnswers: [
				"21", "9", "16"
			]

		},
		{
			question: "What is professional wrestler, John Cena, catch phrase?",
			correctAnswer: "You can't see me!",
			wrongAnswers: [
				"What now?!", "Give you the People's elbow", "Choke Slam"
			]

		},
		{
			question: "What city hosted the 2012 Summer Olympics?",
			correctAnswer: "London, England",
			wrongAnswers: [
				"Rio De Janeiro, Brazil", "Tokyo, Japan", "Beijing, China"
			]

		},
		{
			question: "Who is the only athlete ever to play in a Super Bowl and a World Series?",
			correctAnswer: "Deion Sanders",
			wrongAnswers: [
				"Tom Brady", "Michael Jordon", "Tim Tebow"
			]

		},
		{
			question: "What NFL Quarterback has been in the most Super Bowls?",
			correctAnswer: "Tom Brady",
			wrongAnswers: [
				"Peyton Manning", "John Elway ", "Brett Favre"
			]

		},
		{
			question: "Brazil was eliminated in the 2014 world cup by what team?",
			correctAnswer: "Germany",
			wrongAnswers: [
				"England", "Netherlands", "France"
			]

		},
		{
			question: "The Heisman Trophy is presented in which sport?",
			correctAnswer: "Football",
			wrongAnswers: [
				"Baseball", "Soccer", "Basketball"
			]

		}
		],

		// made this function in order to call and randomize the question order and where the answer show up. 
		displayQuestionAndAnswers: function(QuestionIndex){
			if(questionOrder.indexOf(QuestionIndex) >= questions.qAndA.length){
				setTimeout(function(){
					hideAnswersQuestionsCounters();
					showScore();
				}, 3000);
				
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

//-------------------------------------------------
// lets make a countdown timer
var count = 5; // set the counter 
var startCounter; // call this to start the counter
var _theCounter;
counterHTML.html("Time remaining: " + count); 
var gameHasStarted = false;
var isScoreShowing = false;

// make the count go down by 1 every second
startCounter = function(){_theCounter = setInterval(CountingDown, 1000)}; 

//removes a value of 1 from the counter and updates the html
function CountingDown(){
	count--;
	counterHTML.html("Time remaining: " + count);
	if(count <= 0){
		count = 0;
		counterHTML.html("Time remaining: " + count); 
		if(!isScoreShowing){ //when ever the score isnt showing is when we will give incorrect answers
			incorrectGuess++; //if counts hits zero you get a wrong answer 
			currentQuestion++; //go to the next question 
			timeoutForAnswer(); 
			setTimeout(resetCounter, 3000);
			questions.displayQuestionAndAnswers(questionOrder[currentQuestion]); // show the next question when times up
			resetCounter(); //reset the count and start it again. 
		} 
		if(questionOrder[currentQuestion] < questionOrder.length){ //this checks if we went through all the questions 
			displayCorrectAnswer();
		}
	}
}
//--------------------------------------------------------

function startGame(){
	//detach start button
	$(".start-button").detach();
	//show the counter, question and answers 
	displayQuestionAndAnswersCounterContainers();

	// start the counter
	if(!gameHasStarted){ //need to check if the player has started a game before so counter doesnt run at end screen
		startCounter();
		gameHasStarted = true;
	}
	

	//make the questions come up in a random order each game. 
	makeRandomArray(questions.qAndA.length, questionOrder);
	questionOrder = chance.shuffle(questionOrder);
	questionOrder.push(questionOrder.length+1);
	questions.displayQuestionAndAnswers(questionOrder[currentQuestion]); // display the first question. 
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
	isScoreShowing = true;

}

//function takes an array length and an array and puts 0-length of array in a new array. 
function makeRandomArray(arrayLength, randomArray){ 
	for (i=0; i<arrayLength; i++){
		randomArray.push(i); 
	}
}

function resetCounter(){
	count = 5;
	counterHTML.html("Time remaining: " + count);
}

function hideCorrectAnswer(){
	correctAnswerContainerHTML.hide();
}

function displayCorrectAnswer(){
	hideAnswersQuestionsCounters();
	//gets the correct answer and puts it in the div by using the currentQuestion value as the index
	correctAnswerContainerHTML.show();
	// this looks into the questionOrder array to find which question we are at and pulls the correct answer for that question. 
	correctAnswerHTML.html("The correct answer was: " + questions.qAndA[questionOrder[currentQuestion]].correctAnswer); 
}

function displayQuestionAndAnswersCounterContainers(){
	$(".answer").show();
	$(".question").show();
	$(".counter-container").show();
}

function timeoutForAnswer(){
	setTimeout(function(){
		hideCorrectAnswer();
		displayQuestionAndAnswersCounterContainers();
	}, 3000); 
}


// Game starts here ------------------------------------------------------------------------------

hideAnswersQuestionsCounters();
hideScore();
hideCorrectAnswer();
// clicking starts runs the startGame function
startHTML.on("click", startGame);

startAgainHTML.on("click", function(){ // if the user wants to play again we must reset stats from previous iteration 
	correctGuess = 0;
	incorrectGuess = 0; 
	questionOrder = [];
	currentQuestion = 0;
	isScoreShowing = false;
	resetCounter();
	hideScore();
	startGame();
});

//clicking on an answer 
answersClassHTML.on("click", function(e){
	var answerResult = $(this).children("div").attr("value"); // result of the answer he clicked 
	if(answerResult === "correct"){ //if user clicked correct answer
		correctGuess++; //add to score
		displayCorrectAnswer();
		currentQuestion++; //set the variable so it can be passed in displayQuestionAndAnswers
		timeoutForAnswer();
		setTimeout(resetCounter, 3000);
		questions.displayQuestionAndAnswers(questionOrder[currentQuestion]);
		resetCounter(); // reset counter 
	
	}
	else{
		incorrectGuess++; //add to score
		displayQuestionAndAnswersCounterContainers();
		displayCorrectAnswer();
		currentQuestion++; //set the variable so it can be passed in displayQuestionAndAnswers
		timeoutForAnswer();
		setTimeout(resetCounter, 3000); // set timeout to reset counter that matches how long the answer is displayed. 
		questions.displayQuestionAndAnswers(questionOrder[currentQuestion]);
		resetCounter();
	}
})
