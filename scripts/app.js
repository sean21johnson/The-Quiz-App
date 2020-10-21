/********** TEMPLATE GENERATION FUNCTIONS **********/

/* This function will create the HTML for the initial start screen of the quiz */
function startScreen() {
    return `
        <div class="starter">
            <p>This quiz will determine whether or not you are a true fan of The Office.</p>
            <p>There will be 5 questions total.</p>
            <p>If you can get every question right, you may label yourself a Super Fan!</p>
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
            <label for "choice${index + 1} tabindex=${index + 1}"> ${answer} </label>
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
        <form id="questions-form">
            <fieldset>
                <div class="question">
                    <legend> ${questionNumber.question}</legend>
                </div>
                <div class="choices">
                    <div class="answers">
                        ${showAnswers()}
                    </div>
                </div>
                <button type="submit" id="answer-submit-button" >Submit Answer</button>
            </fieldset>
        </form>
    `;
    return thisQuestion;
}

/*This function is creating the HTML that will reflect on the results page*/
function resultsPage() {
    return `
        <div class="results">
                <fieldset>
                    <legend>Final Score: ${store.score} out of ${store.questions.length}</legend>
                    <button type="button" id="redo"> Try Quiz Again </button>
                </fieldset>
        </div>
    `
}

function answerResponse(input) {
    let response = '';
    let rightAnswer = store.questions[store.questionNumber - 1].correctAnswer;
    console.log(rightAnswer);
    if (input === 'correct') {
        response = `
        <div class="correct-response">You answered correctly!</div>
        <button type="button" id="next-question-button" >Next Question</button>
        `;
    }
    else if (input === 'incorrect') {
        response = `
        <div class="wrong-response">You answered incorrectly. The correct answer is ${rightAnswer}.</div>
        <button type="button" id="next-question-button">Next Question</button>
        `;
    }
    return response;
}

/* This function renders all of the functions onto the screen for the user */
function render() {
        if (store.quizStarted === false){
            $('main').html(startScreen());
        }
        else if (store.quizStarted === true){
            // $('main').html(showAnswers())
            $('main').html(showQuestion());
        }

}



/*EVENT HANDLER functions below*/
function restartTheQuiz() {
    store.quizStarted = false;
    store.currentQuestion = 0;
    store.score = 0;
}

function handleRestartQuiz() {
    $('main').on('click', '#redo', function(){
        restartTheQuiz();
        $('main').html(startScreen)
    })
}

/* This function handles when a user clicks 'Start The Quiz' */ 
function handleStartQuiz() {
    $('main').on('click', '#start', function(){
        store.quizStarted = true;
        render();
    })
}

/*This function handles when a user clicks on "Next Button" */
function handleNextQuestion() {
    $('main').on('click', '#next-question-button', function(evt){
        evt.preventDefault();
        if (store.questionNumber >= store.questions.length) {
            $('main').html(resultsPage());
        }
        else {
            render();
        }
    })
}

// function handleTryAgain() {
//     $('main').on('click', '#redo', function(evt){
//         evt.preventDefault();
//         return startScreen();
//     })
// }

/* This function handles when a user submits the answer to a given question */
function handleAnswerSubmission() {
    $('main').submit('#question-form', function(evt){
        evt.preventDefault();
        let rightAnswer = store.questions[store.questionNumber].correctAnswer;
        let selectedAnswer = $('input[name=choices]:checked').val();
            if (selectedAnswer === rightAnswer) {
                store.score++;
                store.questionNumber++
                return $('main').html(answerResponse('correct'));
            }
            else if (selectedAnswer !== rightAnswer) {
                store.questionNumber++
                return $('main').html(answerResponse('incorrect'));
            }
    })
}

/*This function will effectively show everything on the screen by linking to the main HTML div */
function main() {
    handleStartQuiz();
    render();
    handleAnswerSubmission();
    handleNextQuestion();
    resultsPage();
    handleRestartQuiz();
}

$(main);


