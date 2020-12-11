/*
 * Example store structure
 */

/* Note: All questions from 
 * https://www.thisdayinmusic./quizzes/the-very-hard-beatles-quiz/
 */
const store = {
	questions: [
		{
			question: 'Which is the only day of the week not mentioned in the Beatles song “Lady Madonna"?',
			answers: [
				'Saturday',
				'Tuesday',
				'Thursday',
				'Monday'
			],
			correctAnswer: 'Saturday'
		},
		{
			question: 'Who is the only Beatle to have published an autobiography?',
			answers: [
				'Paul McCartney',
				'John Lennon',
				'George Harrison',
				'Ringo Starr'
			],
			correctAnswer: 'George Harrison'
		},
		{
			question: 'Who was the only Beatle without a beard on the cover of Abbey Road?',
			answers: [
				'Ringo Starr',
				'John Lennon',
				'Paul McCartney',
				'George Harrison'
			],
			correctAnswer: 'Paul McCartney'
		},
		{
			question: 'How many times did The Beatles play at The Cavern Club in Liverpool?',
			answers: [
				'292',
				'178',
				'75',
				'0'
			],
			correctAnswer: '292'
		},
		{
			question: 'What is the Beatles most successful single, with world-wide sales of over 12 million?',
			answers: [
				'She Loves You',
				'Hey Jude',
				'I Want to Hold Your Hand',
				'Twist and Shout'
			],
			correctAnswer: 'I Want to Hold Your Hand'
		}
	],
	quizStarted: false,
	questionNumber: 0,
	score: 0
};


/* -------------------------------------------------------------- */
/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
/* -------------------------------------------------------------- */

/* -- Display UI : Start Quiz -- */
// Added button onclick to handle quiz start
function displayStartUI() {
	return `
    <div class="card js-startDisplay">
      <h2>Test your knowledge of The Beatles</h2>
      <button type="button" id="start-btn" value="start" onclick="handleStartClick()">Hit it!</button>
    </div>`;
}

/* -- Display UI : Question Answer Template -- */
function displayOptionAnswersUI() {
	const getAnswers = store.questions[store.questionNumber].answers;
	let answersArray = [];

	getAnswers.forEach((answer, index) => {
		answersArray.push(`
    <div class="answerContainer-${index}">
    
    <input type="radio" name="options" id="selectedAnswer${index + 1}" value= "${answer}" required>
    <label for="selectedAnswer${index + 1}" class="label">${answer}</label>
    
  </div>
    `);
	});

	return answersArray;
}

/* -- Display UI : Questions Template  -- */
function displayMainQuestionContainerUI() {
	let isCurrentQuestion = store.questions[store.questionNumber];

	return `
    <form id="js-mainForm">
      <fieldset class="card">
        <div id = "metrics">${displayQuesAndScoreUI()}</div>
        <div id="wrapperQuestion">
          <legend> ${isCurrentQuestion.question}</legend>
          <div id="options">
            ${displayOptionAnswersUI().join('')}
          </div>
          <input type="submit" id="submit-btn" value="submit">
        </div>
      </fieldset>
    </form >
  `
}

function displayAnswerCorrect() {
	console.log("card correct ran");
	// $('main').addClass('cardCorrect');
	$('#js-mainForm').addClass('cardCorrect)');
	$('.card').addClass('cardCorrect');
	store.score = store.score + 1;
	store.questionNumber = store.questionNumber + 1;
	$('#score').html(`Score: ${store.score}/${store.questions.length}</p>`);

	return $('#wrapperQuestion').html(`<h1>Groovy!</br> That is correct!</h1><div id="next"><button type="button" id="next-btn" value="start" onclick="renderMain()">Next</button></div>`)
}

function displayAnswerIncorrect(correct) {
	console.log("card incorrect ran");
	// $('main').addClass('cardCorrect');
	$('#js-mainForm').addClass('cardIncorrect)');
	$('.card').addClass('cardIncorrect');
	store.questionNumber = store.questionNumber + 1;
	$('#score').html(`Score: ${store.score}/${store.questions.length}</p>`);

	return $('#wrapperQuestion').html(`<h1>Bummer!</br> The correct answer is ${correct}</h1><div id="next"><button type="button" id="next-btn" value="start" onclick="renderMain()">Next</button></div>`)
}

function displayFinalResultUI() {
	$('#js-mainForm').addClass('cardCorrect)');
	$('.card').addClass('cardCorrect');
	return `
    <div class="card js-startDisplay">
      <h2>Your final score is</br> ${store.score} out of ${store.questionNumber}.</h2>
	  <h3>Do you want to try again?</h3>
      <button type="button" id="start-btn" value="start" onclick="resetQuiz()">Let's do it!</button>
    </div>`;
}

function resetQuiz() {
	store.score = 0;
	store.questionNumber = 0;
	store.quizStarted = false;
	handleQuizApp();
}


// what other functions are needed here?


function displayQuesAndScoreUI() {
	return `
      <p class="alignleft">Question ${store.questionNumber + 1}/${store.questions.length}</p>
      <p id="score" class="alignright">Score: ${store.score}/${store.questions.length}</p>`;
}

function submitAndCheckAnswer() {
	$('input[type=submit]').on('click', function (e) {
		e.preventDefault();
		let userAnswer = ($('input[name=options]:checked').val());
		console.log(userAnswer);
		console.log(store.questions[store.questionNumber].correctAnswer);
		// logic to check answer TBD
		// If correct call daC, if not call daI
		if (userAnswer == store.questions[store.questionNumber].correctAnswer) {
			displayAnswerCorrect();
		}
		else
			displayAnswerIncorrect(store.questions[store.questionNumber].correctAnswer);
	});
}

/* -------------------------------------------------------------- */
/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of 
// the <main> tag based on the state of the store
/* -------------------------------------------------------------- */


function renderMain() {

	console.log("ran renderMain");

	if (store.quizStarted === false) {
		return $('main').html(displayStartUI());
	}

	store.questionNumber >= 0 &&
		store.questionNumber < store.questions.length ?
		$('main').html(displayMainQuestionContainerUI()) :
		$('main').html(displayFinalResultUI());

	submitAndCheckAnswer();



}

/* -------------------------------------------------------------- */
/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
/* -------------------------------------------------------------- */


// what functions do you need here you think?

function handleStartClick() {
	store.quizStarted = true;
	renderMain();
}








/* -------------------------------------------------------------- */
/********** LAUNCH FUNCTIONS AFTER PAGE LOADS **********/
/* -------------------------------------------------------------- */

function handleQuizApp() {
	renderMain();

}

handleQuizApp();