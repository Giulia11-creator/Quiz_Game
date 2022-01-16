
const quizDom = [

    {
        domanda: "Qual è la capitale dell'Italia?",
        a: "Roma",
        b: "Torino",
        c: "Vienna",
        d: "Zurigo",
        correct: "a"
    },
    {
        domanda: "Qual è la capitale dell'Austria?",
        a: "Londra",
        b: "Torino",
        c: "Vienna",
        d: "Zurigo",
        correct: "c"
    },
    {
        domanda: "Qual è lo sport nazionale dell'Afghanistan?",
        a: "Calcio",
        b: "Buzkashi",
        c: "Cricket",
        d: "Bridge",
        correct: "b"
    },
    {
        domanda: "Qual è il piatto nazionale dei Paesi Bassi?",
        a: "Gulash",
        b: "Waffles",
        c: "Rosti",
        d: "L’aringa con cipolle tritate e sottaceti",
        correct: "d"
    },
    {
        domanda: "Aumenta e diminuisce, nessuno la può vedere. Non è fuoco, eppur si può spegnere.",
        a: "il sonno",
        b: "la sete",
        c: "la fame",
        d: "la sapienza",
        correct: "b"
    },
    {
        domanda: "Che cosa succede se metti una pietra verde nel Mar Rosso?",
        a: "Si bagna",
        b: "Diventa marrone",
        c: "Si scioglie",
        d: "Diventa arcobaleno",
        correct: "a"
    },
    {
        domanda: "Senza parlare fa tremare tutti",
        a: "Una notifica di classroom",
        b: "Il freddo",
        c: "Un ragno delle banane",
        d: "Un pesce siluro",
        correct: "b"
    },
    {
        domanda: "Cosa è considerato tradimento in UK?",
        a: "Incollare al contrario un francobollo con il Re o la Regina",
        b: "Fare il solletico ad una guardia inglese",
        c: "Versare il the con la mano sinistra prima delle 17",
        d: "Indossare un cappello più bello di quello della regina",
        correct: "a"
    },
    {
        domanda: "In quale paese è vietato morire in parlamento?",
        a: "Italia",
        b: "Spagna",
        c: "UK",
        d: "Francia",
        correct: "c"
    },
    {
        domanda: "In quale paese è vietato cantare in playback?",
        a: "Turkmenistan",
        b: "Kenya",
        c: "Kazakistan",
        d: "Quatar",
        correct: "a"
    },
    {
        domanda: "In quale paese sono vietati gli ovetti kinder sorpresa?",
        a: "Usa",
        b: "Kenya",
        c: "Russia",
        d: "Germania",
        correct: "a"
    }


];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.risposta');
const questionEl = document.getElementById('domanda');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButton = document.getElementById('submit');
let domandaCorrente = 0;
let punteggio = 0;


CaricaQuiz();

function CaricaQuiz() {

    deseleziona();
    const domandaVisualizzata = quizDom[domandaCorrente];
    const nick = localStorage.getItem("name");
    questionEl.innerText = domandaVisualizzata.domanda;
    a_text.innerText = domandaVisualizzata.a;
    b_text.innerText = domandaVisualizzata.b;
    c_text.innerText = domandaVisualizzata.c;
    d_text.innerText = domandaVisualizzata.d;
    document.getElementById("submitdef").disabled = true;
    document.getElementById("nickname").value=nick;


}

function deseleziona() {

    answerEls.forEach(answerEl => answerEl.checked = false)

}


function Seleziona_una_riposta() {
    let answer;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {

            answer = answerEl.id;

        }
    })

    return answer;
}

submitButton.addEventListener('click', () => {

    const answer = Seleziona_una_riposta();
    if (answer) {

        if (answer === quizDom[domandaCorrente].correct) {

            punteggio += 50;
            document.getElementById("points").value=punteggio;

        }

        domandaCorrente++;

        if (domandaCorrente < quizDom.length) {

            CaricaQuiz();

        }
        else {

            document.getElementById("submitdef").disabled = false;
            
            
        }

    }


})