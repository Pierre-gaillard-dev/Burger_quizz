//déclaration des variables
let miam_nuggets = 0
let miam_selPoivre = 0
let nuggets_posees = []
let selPoivre_posees = []
let selPoivre_theme = null
let timeout_ID = null
const text_theme = document.getElementById("theme")
const button_next = document.getElementById("nextbutton")
const text_question = document.getElementById("question")
const text_reponses = {
    "a": document.getElementById("a"),
    "b": document.getElementById("b"),
    "c": document.getElementById("c"),
    "d": document.getElementById("d")
}

//boutons clickés

text_reponses["a"].addEventListener("click", function() {test_reponse("a")})
text_reponses["b"].addEventListener("click", function() {test_reponse("b")})
text_reponses["c"].addEventListener("click", function() {test_reponse("c")})
text_reponses["d"].addEventListener("click", function() {test_reponse("d")})
//initialisation de l'application
function init() {
	//initialisation des variables au démarage
	miam_nuggets = 0
	miam_selPoivre = 0
    questions_posees = []
	//initialiser les blocs à afficher au démarage
    document.getElementById("start").style.display = "block"
    document.getElementById("quiz").style.display = "none"


}

//Début du quiz
function startQuiz() {
	//afficher les questions et masquer les règles
    document.getElementById("start").style.display = "none"
    document.getElementById("quiz").style.display = "block"

	//Choisir la 1ère questions nuggets aléatoirement
    //showNuggets(questions["nuggets"][0])    //randomNuggets());
	button_next.style.display = "none"
	showNuggets(randomNuggets())
}

//Choisi une question nuggets au hasard
function randomNuggets() {
	//fonction aléatoire entre 0 et MAX. MAX est à modifier selon les besoins
	const MAX = questions["nuggets"].length
	let rng = Math.floor(Math.random() * MAX);

	//tant que la question a déjà été posé ...
	while (nuggets_posees.includes(rng)) {
		//...on relance une question aléatoirement
		rng = Math.floor(Math.random() * MAX);
		if (nuggets_posees.length >=  MAX) {
			console.error("can't chose another unasked nugget")
			return false
		}
	}
	// Choisir une question et garder en mémoire le rng choisi
	nuggets_posees += rng
	//console.log(nuggets_posees)
	//return la question choisi
	return questions["nuggets"][rng]
}


//Choisi une question sel ou poivre au hasard
function randomSelPoivre() {
	let MAX = questions.selPoivre.length
	//fonction aléatoire entre 0 et MAX. MAX est à modifier selon les besoins
	let rng = Math.floor(Math.random() * MAX);

	console.log(questions["selPoivre"])
	//Retourner la fiche de question SelPoivre choisi aléatoirement 
	return questions["selPoivre"][rng]
}

function random_questionSelPoivre(fiche) {
	//fonction aléatoire entre 0 et MAX. MAX est à modifier selon les besoins
	const MAX = fiche["questions"].length
	let rng = Math.floor(Math.random() * MAX);

	//tant que la question a déjà été posé ...
	while (selPoivre_posees.includes(rng)) {
		//...on relance une question aléatoirement
		rng = Math.floor(Math.random() * MAX);
		if (selPoivre_posees.length >=  MAX) {
			console.error("can't chose another unasked nugget")
			return false
		}
	}
	// Choisir une question et garder en mémoire le rng choisi
	selPoivre_posees.push(rng)
	console.log("fiche:"+ fiche, "\nquestion :"+ fiche["questions"][rng])
	//return la question choisi
	return fiche["questions"][rng]
}


//affiche une question nuggets
function showNuggets(question) {
	//masquer le boutton question suivante
	//afficher la question
	text_question.innerHTML = question["question"]
	//afficher les réponses
	text_reponses["a"].innerHTML = question["propositions"]["a"]
	text_reponses["b"].innerHTML = question["propositions"]["b"]
	text_reponses["c"].innerHTML = question["propositions"]["c"]
	text_reponses["d"].innerHTML = question["propositions"]["d"]
	//Gérer les click si la réponse est la bonne ou non

	for (const button_text in text_reponses) {
		//console.log(button_text)
		text_reponses[button_text].style.display= "block"
	}

    
}

//affiche une question SelPoivre
function showSelPoivre(question) {

	//masquer le boutton question suivante

	//récupérer la question courante de la fiche choisie
	console.log(question)

	//afficher la question
	text_question.innerHTML = question["question"]
	//afficher les réponses (que 3 possibilités la D doit être masqué)
	for (const letter in text_reponses) {
		if (selPoivre_theme["propositions"][letter] != null) {
			text_reponses[letter].style.display = "block"
		}
		text_reponses[letter].innerHTML = selPoivre_theme["propositions"][letter]
	}




	//Gérer les click si la réponse est la bonne ou non
	/*
    text_reponses["a"].addEventListener("click", function() {test_reponse(question, "a")})
    text_reponses["b"].addEventListener("click", function() {test_reponse(question, "b")})
    text_reponses["c"].addEventListener("click", function() {test_reponse(question, "c")})
    text_reponses["d"].addEventListener("click", function() {test_reponse(question, "d")})
	*/








}

function test_reponse(user_reponse) {
	let question = null
	if (selPoivre_posees.length == 0) {
		question = questions.nuggets[nuggets_posees[nuggets_posees.length-1]]
	} else {
		question = selPoivre_theme.questions[selPoivre_posees[selPoivre_posees.length-1]]
	}
	console.log(question)
	console.log(user_reponse)
	for (i in text_reponses) {
		if (text_reponses[i].style.borderColor != "") {return false}
	}

    if (user_reponse == question["reponse"]) {
        console.log(user_reponse, "bon")
        bonneReponse(user_reponse)
    } else {
        console.log(user_reponse, "mauvais")
        mauvaiseReponse(user_reponse)
    }
	button_next.style.display = "block"
	for (let i in text_reponses) {
		if (i == question["reponse"]) {
			if (text_reponses["d"].style.display == "none"  && user_reponse == "d") {
				text_reponses[i].style.backgroundColor = "#CC3626"
			} else {
				text_reponses[i].style.backgroundColor = "#2DA000"
				text_reponses[i].style.color = "white"
			}
		} else if (i == user_reponse){
			text_reponses[i].style.backgroundColor = "#CC3626"
		}
	}
}

//Fonction a appeler si on clique sur la bonne réponse
function bonneReponse(user_reponse) {
	//Mettre à jour le score
	if (selPoivre_theme == null) {
		miam_nuggets ++
	} else {
		miam_selPoivre ++
	}
	//Afficher le bouton question suivante
	text_reponses[user_reponse].style.border = "DAAE0D 5px solid"

}


//Fonction a appeler si on clique sur la mauvaise réponse
function mauvaiseReponse(user_reponse) {
	text_reponses[user_reponse].style.border = "#daae0d 2px solid "
}


//fonction appelé par le bouton Question suivante
function next() {
	if (timeout_ID != null) {clearTimeout(timeout_ID)}
	
    button_next.style.display = "none"
	for (let i in text_reponses) {
		text_reponses[i].style.backgroundColor = "#6364a0"
		text_reponses[i].style.border = ""
		text_reponses[i].style.display = "none"
	}
	
	console.log(selPoivre_posees)
	//si il reste des questions nuggets
	if (nuggets_posees.length < questions["nuggets"].length && nuggets_posees.length < 3) {
		showNuggets(randomNuggets())
	}//SINON si il reste des question poivreSel
	else if ((selPoivre_theme == null || selPoivre_posees.length < selPoivre_theme.questions.length) && selPoivre_posees.length < 7) {
		if (selPoivre_theme == null) {
			selPoivre_theme = randomSelPoivre()
			console.log(selPoivre_theme)
			text_theme.innerHTML = selPoivre_theme.theme
			text_question.innerHTML = ""
			button_next.style.display = "block"

			currentQuestion = -1
			totalQuestions = 7
		} else {
			let a = random_questionSelPoivre(selPoivre_theme)
			console.log(a)
			showSelPoivre(a)

			document.getElementById("timer-container").style.display = "block"
			timeout_ID = setTimeout(test_reponse, 5000, "d")
			let progress = document.getElementById("progress")
			progress.classList.remove("animation")
			void progress.offsetWidth
			progress.classList.add("animation")
		}
	}//Sinon afficher la fin du jeu 
	else {
		//Lancer la fin du jeu
		document.getElementById("quiz").style.display = "none"
		endgame()
		
	}
	currentQuestion ++
	updateQuestionNumber()
}


//fonction de fin de jeu
function endgame(){
	//Masque tous les bloc
	let text_victoire
	if (miam_nuggets + miam_selPoivre >= 5) {
		text_victoire = "Bravo vous avez gagné !"
	} else {
		text_victoire = "Pas ouf tout ça !"
	}
	//Affiche le bloc résultat
	document.getElementById("text_resultat").innerHTML = text_victoire
	document.getElementById("score_total").innerHTML = miam_nuggets + miam_selPoivre
	document.getElementById("resultat").style.display = "block";
	document.getElementById("resultat_nuggets").innerHTML = miam_nuggets
	document.getElementById("selPoivre_nuggets").innerHTML = miam_selPoivre

}

init();



let currentQuestion = 1;
let totalQuestions = 3;
// Mettre à jour le numéro de la question affichée
function updateQuestionNumber() {
  document.getElementById('current-question').innerHTML = currentQuestion;
  document.getElementById('total-questions').innerHTML = totalQuestions;
}

updateQuestionNumber();