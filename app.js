/********** TEMPLATE GENERATION FUNCTIONS **********/

/* This function will create the HTML for the initial start screen of the quiz */
function startScreen() {
    return `
        <div class="starter">
            <p>This quiz will determine whether or not you are a true fan of The Office</p>
            <p>There will be 5 questions total</p>
            <p>If you can get every question right, you are entitled to label yourself a SuperFan</p>
            <button type="button" id="start">Start The Quiz</button>
        </div>
    `;
}

/* This function is creating the HTML that displays which question # the user is on */
function questionNumbers() {   
    return `
        <ul class="question-current">
            <li id="question-number">
                Question Number: ${store.questionNumber + 1} out of ${store.questions.length}
            </li>
    `;
}

/* This function is creating the HTML that displays the score for the user at whichever question they are currently on */
function overallScore() {
    return `
        <ul class="current-score">
            <li id="score">
                Current Score: ${store.score} out of ${store.questions.length}
            </li>
        </ul>
    `;  
}

/* This function is creating the HTML that displays the list of answers to a given question */
function showAnswers() {
    const answersArray = store.questions[store.questionNumber].answers;
    let answersHtml = '';
    let index = 0;

    answersArray.forEach(answer => {
        answersHtml += `
        <div id="choice-container-${index}">
            <input type="radio" name="choices" id="choice${index + 1}" value="${answer}" tabindex="${index + 1}" required>
            <label for "choice${index + 1}"> ${answer}</label>
        </div>
        `;
        index++;
    });
    return answersHtml;
}

/*This function is creating the HTML that displays a given question.  Also note that the showAnswers() function will need to be called here in order to get the answers to reflect */
function showQuestion() {
    let questionNumber = store.questions[store.questionNumber];
    let thisQuestion = ''
    thisQuestion += `
        <div class="question-number">
        ${questionNumbers()}
        </div>
        <div class="scorer"
        ${overallScore()}
        </div>
        <form id="questions-form" class="questions-form">
            <fieldset>
                <div class="question">
                    <legend> ${questionNumber.question}</legend>
                </div>
                <div class="choices">
                    <div class="answers">
                        ${showAnswers()}
                    </div>
                </div>
                <button type="submit" id="answer-submit-button" tabindex="5">Submit Answer</button>
                <button type="button" id="next-question-button" tabindex="6">Next Question></button>
            </fieldset>
        </form>
    `;
    return thisQuestion;
}

/*This function is creating the HTML that will reflect on the results page*/
function resultsPage() {
    return `
        <div class="results">
            <form id="js-restart-quiz">
                <fieldset>
                    <legend>Final Score: ${store.score} out of ${store.questions.length}</legend>
                    <button type="button" id="redo"> Try Quiz Again </button>
                </fieldset>
            </form>
        </div>
    `
}

function answerResponse(input) {
    let response = '';
    let rightAnswer = store.questions[store.questionNumber].correctAnswer;
    if (input === 'correct') {
        response = `
        <div class="correct-response">You answered correctly!</div>
        `;
    }
    else if (input === 'incorrect') {
        response = `
        div class="wrong-response">You answered incorrectly. The correct answer is ${rightAnswer}.</div>
        `;
    }
    return response;
}

/* This function renders all of the functions onto the screen for the user */
function render() {
        let text = ' '
        if (store.quizStarted === false){
            $('main').html(startScreen());
        } 
        else if (store.quizStarted === true){
            $('main').html(showAnswers())
            $('main').html(showQuestion())
        }
}



/*EVENT HANDLER functions below*/

/* This function handles when a user clicks 'Start The Quiz' */ 
function handleStartQuiz() {
    $('main').on('click', '#start', function(){
        store.quizStarted = true;
        render();
    })
}

/* This function handles when a user submits the answer to a given question */
function handleAnswerSubmission() {
    let rightAnswer = store.questions[store.questionNumber].correctAnswer;
    let selection = $('main').on('click', '#answer-submit-button', function(evt){
        evt.preventDefault();
        console.log(selection);
           if (selection === rightAnswer){
            store.score++
           }
        //    render(); 
    })
}

/*This function will effectively show everything on the screen by linking to the main HTML div */
function main() {
    render();
    handleStartQuiz();
    handleAnswerSubmission();
}

$(main);


