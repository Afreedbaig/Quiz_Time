const startscreen = document.getElementById("startscreen");
const questionscreen = document.getElementById("questionscreen");
const resultscreen = document.getElementById("resultscreen");
const start_button = document.getElementById("startquiz");
const question = document.getElementById("Question");
const question_number = document.getElementById("qnum");
const no_of_questions = document.getElementById("numq");
const answers_container = document.getElementById("answers");
const progress = document.getElementById("progress");
const score = document.getElementById("score");
const res_statement = document.getElementById("res_statement");
const restartbtn = document.getElementById("restartbtn");

function shuffleArray(array) {
    // Loop backwards from the last element down to the second element
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements array[i] and array[j] using destructuring assignment
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getnewques(num, cat, diff) {
    console.log(
        `https://opentdb.com/api.php?amount=${num}` +
            `${cat}` +
            `${diff}` +
            `&type=multiple`,
    );
    const res = await fetch(
        `https://opentdb.com/api.php?amount=${num}` +
            `${cat}` +
            `${diff}` +
            `&type=multiple`,
    );
    const data = await res.json();
    console.log(data);
    const ress = data.results;
    const refineddata = ress.map((obj) => {
        const answers = [
            { text: obj.correct_answer, correct: true },
            { text: obj.incorrect_answers[0], correct: false },
            { text: obj.incorrect_answers[1], correct: false },
            { text: obj.incorrect_answers[2], correct: false },
        ];
        return {
            question: obj.question,
            answers: shuffleArray(answers),
        };
    });
    return refineddata;
}

// const refineddata = [
//     {
//         question: "What does LTS stand for in the software market?",
//         answers: [
//             { text: "Ludicrous Transfer Speed", correct: false },
//             { text: "Ludicrous Turbo Speed", correct: false },
//             { text: "Long Taco Service", correct: false },
//             { text: "Long Term Support", correct: true },
//         ],
//     },
//     {
//         question: "What does the term USB stand for?",
//         answers: [
//             { text: "Unityped Semtex Backer", correct: false },
//             { text: "Universal Simtex Blot", correct: false },
//             { text: "Unified Signal Bus", correct: false },
//             { text: "Universal Serial Bus", correct: true },
//         ],
//     },
//     {
//         question:
//             "Which programming language shares its name with an island in Indonesia?",
//         answers: [
//             { text: "C", correct: false },
//             { text: "Python", correct: false },
//             { text: "Java", correct: true },
//             { text: "Jakarta", correct: false },
//         ],
//     },
//     {
//         question:
//             "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
//         answers: [
//             { text: "Atari", correct: false },
//             { text: "Commodore", correct: false },
//             { text: "Apple", correct: true },
//             { text: "Microsoft", correct: false },
//         ],
//     },
//     {
//         question:
//             "What is the most preferred image format used for logos in the Wikimedia database?",
//         answers: [
//             { text: ".png", correct: false },
//             { text: ".gif", correct: false },
//             { text: ".svg", correct: true },
//             { text: ".jpeg", correct: false },
//         ],
//     },
//     {
//         question:
//             "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
//         answers: [
//             { text: "Public", correct: false },
//             { text: "Final", correct: true },
//             { text: "Static", correct: false },
//             { text: "Private", correct: false },
//         ],
//     },
//     {
//         question: "In computing, what does MIDI stand for?",
//         answers: [
//             { text: "Musical Instrument Digital Interface", correct: true },
//             { text: "Musical Instrument Data Interface", correct: false },
//             {
//                 text: "Musical Interface of Digital Instruments",
//                 correct: false,
//             },
//             {
//                 text: "Modular Interface of Digital Instruments",
//                 correct: false,
//             },
//         ],
//     },
//     {
//         question: "What is the name of Layer 7 of the OSI model?",
//         answers: [
//             { text: "Network", correct: false },
//             { text: "Present", correct: false },
//             { text: "Application", correct: true },
//             { text: "Session", correct: false },
//         ],
//     },
//     {
//         question:
//             "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
//         answers: [
//             { text: "1000", correct: true },
//             { text: "500", correct: false },
//             { text: "1024", correct: false },
//             { text: "512", correct: false },
//         ],
//     },
//     {
//         question: "In computing, what does LAN stand for?",
//         answers: [
//             { text: "Land Address Navigation", correct: false },
//             { text: "Local Area Network", correct: true },
//             { text: "Long Antenna Node", correct: false },
//             { text: "Light Access Node", correct: false },
//         ],
//     },
// ];
let refineddata;

let currentQuestionIndex = 0;
let scoree = 0;
let answerDisabled = false;

start_button.addEventListener("click", startQuiz);
restartbtn.addEventListener("click", restartQuiz);

async function startQuiz() {
    currentQuestionIndex = 0;
    scoree = 0;
    answerDisabled = false;
    question_number.textContent = currentQuestionIndex;
    start_button.style.display = "none";
    document.getElementById("wait").style.display = "inline";
    let inputqnum = document.getElementById("inputnumq");
    let cat = document.getElementById("cat");
    let diff = document.getElementById("diff");
    if (inputqnum.value > 0 && inputqnum.value < 15) {
        no_of_questions.textContent = inputqnum.value;
        if (cat.value == 0 && diff.value == "any") {
            refineddata = await getnewques(inputqnum.value);
        } else if (cat.value != 0 && diff.value == "any") {
            refineddata = await getnewques(
                inputqnum.value,
                `&category=${cat.value}`,
            );
        } else if (cat.value == 0 && diff.value != "any") {
            refineddata = await getnewques(
                inputqnum.value,
                (diff = `&difficulty=${diff.value}`),
            );
        } else {
            refineddata = await getnewques(
                inputqnum.value,
                `&category=${cat.value}`,
                `&difficulty=${diff.value}`,
            );
        }

        questionscreen.classList.add("active");
        startscreen.classList.remove("active");
        start_button.style.display = "inline";
        document.getElementById("wait").style.display = "none";
        showQuestion();
    } else {
        document.getElementById("wait").style.display = "none";
        let showp = document.getElementById("showp");
        let tryagain = document.getElementById("tryagain");
        tryagain.addEventListener("click", () => {
            window.location.reload();
        });

        let highorlow = document.getElementById("highorlow");
        if (inputqnum.value < 0) {
            highorlow.textContent = "less than 0";
        } else {
            highorlow.textContent = "greater than 15!!!";
        }
        showp.classList.add("showing");
        tryagain.classList.add("showing");
    }
}
function restartQuiz() {
    currentQuestionIndex = 0;
    scoree = 0;
    answerDisabled = false;
    getnewques();
    resultscreen.classList.remove("active");
    startQuiz.classList.add("active");
}

function showQuestion() {
    answerDisabled = false;

    const currquestion = refineddata[currentQuestionIndex];

    question_number.textContent = currentQuestionIndex + 1;

    const progresspercent = (currentQuestionIndex / refineddata.length) * 100;

    progress.style.width = progresspercent + "%";

    let div = document.createElement("div");
    div.innerHTML = currquestion.question;

    question.textContent = div.textContent;
    answers_container.innerHTML = "";

    currquestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answers_container.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answerDisabled) return;
    answerDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    Array.from(answers_container.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        scoree++;
        score.textContent = scoree;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < refineddata.length) {
            showQuestion();
        } else {
            showres();
        }
    }, 1000);
}

function showres() {
    document.getElementById("res_score").textContent = scoree;
    document.getElementById("res_numq").textContent = refineddata.length;
    questionscreen.classList.remove("active");
    resultscreen.classList.add("active");
}
