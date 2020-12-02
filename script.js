/*
 * Example store structure
 */
const store = {
	questions: [
		{
			question: 'Ancient Egyptians hung what animal above their doorway, which was believed to ward off disease?',
			answers: [
				'Weasel',
				'Bat',
				'Ibis',
				'Kingfisher'
			],
			correctAnswer: 'Bat'
		},
		{
			question: 'If the history of life on Earth were put to a 24-hr clock, how long would have humans been here shaping this world?',
			answers: [
				'Seconds',
				'Mins',
				'Hours',
				'Day'
			],
			correctAnswer: 'Seconds'
		},
		{
			question: 'Who first described the golden ratio?',
			answers: [
				'Aristotle',
				'Isaac Newton',
				'Da Vinci',
				'Euclid'
			],
			correctAnswer: 'Euclid'
		},
		{
			question: 'Which animal was used to model the fastest bullet train?',
			answers: [
				'Peregrine Falcon',
				'Kingfisher',
				'Sailfish',
				'Tiger beetle'
			],
			correctAnswer: 'Kingfisher'
		},
		{
			question: 'Pressure sensors underwater that help detect Tsunami waves are based on which animal?',
			answers: [
				'Orcas',
				'Whale shark',
				'Beluga whale',
				'Dolphins'
			],
			correctAnswer: 'Dolphins'
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
      <h2>Test your knowledge of Biomimicry</h2>
      <button type="button" id="start-btn" value="start" onclick="handleStartClick()">Start</button>
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
        <div>${displayQuesAndScoreUI()}</div>
        <div id="wrapperQuestion">
          <legend> ${isCurrentQuestion.question}</legend>
          <div id="options">
            ${displayOptionAnswersUI().join('')}
          </div>
          <input type="submit" id="submit-btn" value="submit">
        </div>
      </fieldset>
    </form >
  `;
}


// what other functions are needed here?

function displayQuesAndScoreUI() {
	return `
      <p class="alignleft">Question ${store.questionNumber + 1}/${store.questions.length}</p>
      <p class="alignright">Score: ${store.score}/${store.questions.length}</p>`;
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