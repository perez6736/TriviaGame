// make the variables for the HTML stuff
var counterHTML = $("#counter");
var questionHTML = $("#question1");
var answer1HTML = $("#answer0");
var answer2HTML = $("#answer1");
var answer3HTML = $("#answer2");
var answer4HTML = $("#answer3");
var startHTML = $("#start");
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

		//TODO -- make it so it displays each question once in a random order
		displayQuestionAndAnswers: function(QuestionIndex){
			if(QuestionIndex === questions.qAndA.length){
				console.log("done");
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


//function takes an array length and an array and puts 0-length of array in a new array. 
function makeRandomArray(arrayLength, randomArray){ 
	for (i=0; i<arrayLength; i++){
		randomArray.push(i); 
	}
}


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
	if(count === 0){
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

	console.log(questionOrder);
	questions.displayQuestionAndAnswers(currentQuestion); // display the first question. 
}

//hide all divs initially 
answersClassHTML.hide();
questionClassHTML.hide();
counterClassHTML.hide();

//when you click start - we must detach the start button and attach the questions counter and answers 
startHTML.on("click", startGame);

answersClassHTML.on("click", function(e){
	var answerResult = $(this).children("div").attr("value"); // result of the answer he clicked 
	if(answerResult === "correct"){
		correctGuess++; 
		currentQuestion++;
		if(currentQuestion > questions.qAndA.length){ //if they reach the end of all questions we shouldn't display more questions 
			console.log("no more questions!");
		}
		else{
			questions.displayQuestionAndAnswers(currentQuestion);
		}
		
	}
})