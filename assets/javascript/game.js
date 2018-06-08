var numberOfWins = 0;
var numberOfLoses = 0;
var numberOfGuessesLeft = 11;
var guesses = "Number of guesses left : ";
var wins = "Number of wins : ";
var loses = "Number of loses : ";
var wordString = "Word : ";
var wordList = [
					"Hello",
					"world",
					"sun",
					"moon",
					"rain",
					"water"];
var guessedLetters = "Letter Entered : ";

var gameStarted = false;
var data = {};
data['numberOfLoses'] = numberOfLoses;
data['numberOfWins'] = numberOfWins;


var blink = setInterval(function() {
	document.getElementById('blink').style.visibility = (document.getElementById('blink').style.visibility == 'hidden' ? '' : 'hidden');
	}, 1000);


var init = function(){
	data['numberOfGuessesLeft'] = numberOfGuessesLeft;
	data['gameStarted'] = gameStarted;
	data['currentGuessed'] = [];
	data['gameOver'] = false;
	var currentWord = wordList[Math.floor(Math.random() * wordList.length)];
	data['currentWord'] = currentWord.toUpperCase();
	var numberOfBlank = wordBlock(currentWord.toUpperCase());
	data['blankGuesses'] = numberOfBlank;
	document.querySelector("#guessedTime").innerHTML = guesses + numberOfGuessesLeft;
	document.querySelector("#wins").innerHTML = wins + data.numberOfWins;
	document.querySelector("#loses").innerHTML = loses + data.numberOfLoses;
	document.querySelector('#word').innerHTML = wordString + numberOfBlank;
	document.querySelector('#guessedChar').innerHTML = guessedLetters + "";
}

var wordBlock = function(currentWord){
	var numberOfBlank = "";

	for(var i=0; i< currentWord.length; i++){

		if(i == currentWord.length-1){
			numberOfBlank += "_";
		}else{
			numberOfBlank += "_ ";
		}
		 
	}
	return numberOfBlank;
}




window.onload = function(){
	return init();
}

document.onkeypress = function (event) {
	data.gameStarted = true;
	clearInterval(blink);
	document.getElementById('blink').style.visibility = 'hidden';
	var inputChar = event.key.toUpperCase();
	var inputKey = event.keyCode;
	if(!event.shiftKey){
		inputKey = inputKey - 32;
	}
	game(inputKey, inputChar);
	
}

var game = function(inputKey, inputChar){

	if(data.numberOfGuessesLeft <= 0){
		data.numberOfLoses = ++data.numberOfLoses;
		data.gameOver = true;
	}
	if(data.gameOver){
		document.querySelector("#loses").innerHTML = loses + data.numberOfLoses;
		return init();
	}

	if(inputKey > 64 &&  inputKey < 91){
		if(!data.currentGuessed.includes(inputChar)){
			data.currentGuessed.push(inputChar);
			if(!data.currentWord.includes(inputChar)){
					--data.numberOfGuessesLeft ;
			}else{
				reWriteString(inputChar);
				var correctedWord = data.blankGuesses.replace(/ /g, "");
				document.querySelector('#word').innerHTML = wordString + data.blankGuesses;
				if(data.currentWord === correctedWord){
					++data.numberOfWins;
					document.querySelector("#wins").innerHTML = wins + data.numberOfWins;
					return init();
				}
			}
		}

	}

	document.querySelector("#guessedTime").innerHTML = guesses + data.numberOfGuessesLeft;
	document.querySelector('#guessedChar').innerHTML = guessedLetters + data.currentGuessed;
}

var reWriteString = function(inputChar) {
	var word = data.blankGuesses.split("");
	word = word.filter(entry => entry.trim() != '');

	for(var i=0; i< data.currentWord.length; i++){
		if(data.currentWord[i] === inputChar){
			word[i] = inputChar;
		}
	}

	data.blankGuesses = word.toString().replace(/,/g, " ");
}

