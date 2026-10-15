
let questions = [
    {
        question: "1. Which language is used to make web pages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "2. Which keyword is used to declare a variable?",
        options: ["var", "print", "echo", "display"],
        answer: "var"
    },
    {
        question: "3. Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "4. Which method adds an item to the end of an array?",
        options: ["pop()", "push()", "shift()", "slice()"],
        answer: "push()"
    },
    {
        question: "5. Which data type stores true or false?",
        options: ["String", "Number", "Boolean", "Array"],
        answer: "Boolean"
    },
    {
        question: "6. Which loop repeats while a condition is true?",
        options: ["if", "while", "switch", "return"],
        answer: "while"
    },
    {
        question: "7. Which method selects an element using its ID?",
        options: [
            "getElementById()",
            "getElementsByClass()",
            "createElement()",
            "appendChild()"
        ],
        answer: "getElementById()"
    },
    {
        question: "8. Which method adds an event listener to an element?",
        options: [
            "addEventListener()",
            "addElement()",
            "clickEvent()",
            "createEventListener()"
        ],
        answer: "addEventListener()"
    }
];

// Store the current question number and score
let currentIndex = 0;
let score = 0;

// Get HTML elements using their IDs
let questionNumber = document.getElementById("question-number");
let questionText = document.getElementById("question");
let optionsDiv = document.getElementById("options");
let feedback = document.getElementById("feedback");
let nextBtn = document.getElementById("next-btn");
let resultDiv = document.getElementById("result");

// Function to display a question
function showQuestion() {

    optionsDiv.innerHTML = "";
    feedback.innerHTML = "";

    nextBtn.disabled = true;

    let currentQuestion = questions[currentIndex];

    questionNumber.innerText =
        "Question " + (currentIndex + 1) + " out of " + questions.length;

    questionText.innerText = currentQuestion.question;

    for (let i = 0; i < currentQuestion.options.length; i++) {

        let optionBtn = document.createElement("button");

        optionBtn.innerText = currentQuestion.options[i];

        optionBtn.classList.add("option-btn");

        optionBtn.addEventListener("click", function () {

            checkAnswer(optionBtn, currentQuestion.options[i]);
        });

        optionsDiv.appendChild(optionBtn);
    }
}

// Function to check the selected answer
function checkAnswer(selectedBtn, selectedAnswer) {

    let currentQuestion = questions[currentIndex];

    
    let allButtons = optionsDiv.children;

    
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }

    
    if (selectedAnswer === currentQuestion.answer) {

        selectedBtn.classList.add("correct");

        feedback.innerText = "Correct Answer!";
        feedback.style.color = "green";

        
        score++;

    } else {

        selectedBtn.classList.add("wrong");

        feedback.innerText =
            "Wrong Answer! Correct answer: " + currentQuestion.answer;

        feedback.style.color = "red";

        
        for (let i = 0; i < allButtons.length; i++) {

            if (allButtons[i].innerText === currentQuestion.answer) {
                allButtons[i].classList.add("correct");
            }
        }
    }

    
    nextBtn.disabled = false;
}

// Function to move to the next question
function nextQuestion() {

    currentIndex++;

    if (currentIndex < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
}

// Function to display the final score
function showResult() {

    
    questionNumber.style.display = "none";
    questionText.style.display = "none";
    optionsDiv.style.display = "none";
    feedback.style.display = "none";
    nextBtn.style.display = "none";

    let message = "";

    if (score >= 7) {
        message = "Excellent work!";
    } else if (score >= 5) {
        message = "Good job! Keep practising.";
    } else if (score >= 3) {
        message = "Not bad. Keep learning!";
    } else {
        message = "Keep practising and try again!";
    }

    resultDiv.innerHTML =
        "<h2>You scored " + score + " out of " + questions.length + "</h2>" +
        "<p>" + message + "</p>";

    
    let restartBtn = document.createElement("button");

    restartBtn.innerText = "Restart Quiz";
    restartBtn.id = "restart-btn";

    restartBtn.addEventListener("click", restartQuiz);

    resultDiv.appendChild(restartBtn);
}


function restartQuiz() {

    
    currentIndex = 0;
    score = 0;

    
    resultDiv.innerHTML = "";

    
    questionNumber.style.display = "block";
    questionText.style.display = "block";
    optionsDiv.style.display = "flex";
    feedback.style.display = "block";
    nextBtn.style.display = "inline-block";

    
    showQuestion();
}


nextBtn.addEventListener("click", nextQuestion);


showQuestion();
