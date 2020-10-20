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

// startScreen();
// Tested & Working

/* This function is creating the HTML that displays which question # the user is on */
function questionNumber() {   
    return `
        <ul class="question-current">
            <li id="question-number">
                Question Number: ${store.questionNumber + 1} out of ${store.questions.length}
            </li>
    `;
}

// questionNumber();
// Tested & Working

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

// overallScore();
// Tested & Working

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

// showAnswers();
// Tested & Working

/*This function is creating the HTML that displays a given question.  Also note that the showAnswers() function will need to be called here in order to get the answers to reflect */

function showQuestion() {
    let questionNumber = store.questions[store.questionNumber];
    return `
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
}

// showQuestion()
// Tested & Working

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

// resultsPage();
// Tested & Working

function answerResponse(input) {
    let response = '';
    let rightAnswer = store.quetsions[store.questionNumber].correctAnswer;
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



