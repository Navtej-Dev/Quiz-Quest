const quizQuestions = {
    '1-3': [
        {
            question: "What color is the sky?",
            options: ["Blue", "Green", "Red"],
            correctAnswer: "Blue",
            points: 1
        },
        {
            question: "How many legs does a dog have?",
            options: ["2", "4", "6"],
            correctAnswer: "4",
            points: 1
        },
        {
            question: "What number comes after 2?",
            options: ["1", "3", "4"],
            correctAnswer: "3",
            points: 1
        }
    ],
    '4-6': [
        {
            question: "What is 5 + 7?",
            options: ["10", "12", "15"],
            correctAnswer: "12",
            points: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter"],
            correctAnswer: "Mars",
            points: 2
        },
        {
            question: "How many sides does a triangle have?",
            options: ["3", "4", "5"],
            correctAnswer: "3",
            points: 2
        }
    ],
    '7-8': [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris"],
            correctAnswer: "Paris",
            points: 3
        },
        {
            question: "What is 8 x 9?",
            options: ["63", "72", "81"],
            correctAnswer: "72",
            points: 3
        },
        {
            question: "Which gas do plants absorb from the air?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
            correctAnswer: "Carbon Dioxide",
            points: 3
        }
    ]
};

let currentClass = '';
let currentQuestion = 0;
let score = 0;

const quizButtons = document.querySelectorAll('.start-quiz');
const quizContainer = document.getElementById("quizContainer");
const questionContainer = document.getElementById("questionContainer");
const submitQuizButton = document.getElementById("submitQuiz");
const resultContainer = document.getElementById("resultContainer");

quizButtons.forEach(button => {
    button.addEventListener("click", (e) => startQuiz(e.target.dataset.class));
});
submitQuizButton.addEventListener("click", submitAnswer);

function startQuiz(classLevel) {
    currentClass = classLevel;
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentClass][currentQuestion];
    let html = `<h3>${question.question}</h3>`;
    
    question.options.forEach((option, index) => {
        html += `
            <input type="radio" name="answer" id="option${index}" value="${option}">
            <label for="option${index}">${option}</label><br>
        `;
    });

    questionContainer.innerHTML = html;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (selectedOption) {
        const currentQuiz = quizQuestions[currentClass];
        if (selectedOption.value === currentQuiz[currentQuestion].correctAnswer) {
            score += currentQuiz[currentQuestion].points;
        }

        currentQuestion++;

        if (currentQuestion < currentQuiz.length) {
            displayQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Please select an answer!");
    }
}

function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    const totalPoints = quizQuestions[currentClass].reduce((sum, question) => sum + question.points, 0);
    resultContainer.innerHTML = `You scored ${score} out of ${totalPoints} points!`;
    
    // Store the result (you can modify this to use JSON or other storage methods)
    localStorage.setItem(`quizResult_${currentClass}`, JSON.stringify({score: score, totalPoints: totalPoints}));

    // Store the result in JSON format
//     const resultData = {
//         score: score,
//         totalPoints: totalPoints
//     };
//     localStorage.setItem(`quizResult_${currentClass}`, JSON.stringify(resultData));
}