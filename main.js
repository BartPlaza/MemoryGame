
const levels = {
	0: [6,2],
	1: [6,3],
	2: [6,4]
}

const startButton = document.getElementById('start-button');
const startPanel = document.getElementById('start-game');
const gameWrapper = document.getElementById('game-wrapper');
const cardsWrapper = document.getElementById('cards-wrapper');
const roundsCounter = document.getElementById('rounds-counter')
var move = 0;
var value;
var element;
var round = 0;

startButton.addEventListener('click', function(){
	let level = document.getElementById('level').value;
	startGame(level);
});

function startGame(level) {
	startPanel.style.display = "none";
	let x = levels[level][0];
	let y = levels[level][1];

	generateCards(x*y);
	addClickListeners();
}

function generateCards(cards){
	let actualValue = 0;
	let cardsArray = [];
	for(let i=1; i<=cards; i++){
		let card = document.createElement('div');
		card.className = 'card';
		card.setAttribute('value', actualValue);
		if(i % 2 == 0){
			actualValue++;
		}
		cardsArray.push(card);
	};
	cardsArray = shuffleCards(cardsArray);
	displayCards(cardsArray);
}

function shuffleCards(cardsArray){
	let cardsNumber = cardsArray.length;
	console.log(cardsArray[2]);

	for (let i = cardsNumber - 1; i > 0; i --) {
		let j = Math.floor(Math.random() * (i+1));
		let temp = cardsArray[i];
		cardsArray[i] = cardsArray[j];
		cardsArray[j] = temp;
	}
	return cardsArray;
}

function displayCards(cardsArray){
	for(let i=0; i<cardsArray.length; i++){
		cardsWrapper.appendChild(cardsArray[i]);
	}
}

function addClickListeners(){
	let cards = document.getElementsByClassName('card');
	for(let i=0; i< cards.length; i++) {
		cards[i].addEventListener('click', function(){
			if(move == 0){
				value = this.getAttribute('value');
				element = this;
				this.classList.add('selected');
				this.innerHTML = value;
				move++;
			} else if(move == 1){
				this.classList.add('selected');
				this.innerHTML = this.getAttribute('value');
				if(value == this.getAttribute('value')){
					let el = this;
					setTimeout(function(){
					el.style.visibility='hidden';
					element.style.visibility="hidden";
					},1000);
				} else {
					let el= this;
					setTimeout(function(){
						el.classList.remove('selected');
						el.innerHTML='';
						element.classList.remove('selected');
						element.innerHTML = '';
						},1000);
				}
				move--;
				updateRound();
			}
		});
	}
}

function updateRound(){
	round++
	roundsCounter.querySelector('span').innerHTML = round;
}
