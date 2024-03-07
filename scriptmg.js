const cards = document.getElementsByClassName('card');
let allImages = document.getElementsByClassName('card-image');
let movesDisplay = document.querySelector('.move-counter');
let toggledCardsArray = [];
let move = 0;
let winCount = 0;
const restart = document.getElementById('restart');

const imagesLinkArray = [
	{
		id: 1,
		image: 'images/redcell.png',
		newAlt: 'redcell Image'
	},
	{
		id: 2,
		image: 'images/blood.png',
		newAlt: 'blood Image'
	},
	{
		id: 3,
		image: 'images/bloodbag.png',
		newAlt: 'bloodbag Image'
	},
	{
		id: 4,
		image: 'images/wholeb.png',
		newAlt: 'wholeb Image'
	},
	{
		id: 5,
		image: 'images/platelet.png',
		newAlt: 'platelet Image'
	},
	{
		id: 6,
		image: 'images/bloodbag.png',
		newAlt: 'bloodbag Image'
	},
	{
		id: 7,
		image: 'images/platelet.png',
		newAlt: 'platelet Image'
	},
	{
		id: 8,
		image: 'images/blood.png',
		newAlt: 'blood Image'
	},
	{
		id: 9,
		image: 'images/plasma.png',
		newAlt: 'plasma Image'
	},
	{
		id: 10,
		image: 'images/redcell.png',
		newAlt: 'redcell Image'
	},
	{
		id: 11,
		image: 'images/plasma.png',
		newAlt: 'plasma Image'
	},
	{
		id: 12,
		image: 'images/wholeb.png',
		newAlt: 'wholeb Image'
	}
];

// function to restart the game
function restartGame() {
	let toggledCard = document.getElementsByClassName('card toggled');
    //generate random position on array when restart
	imagesLinkArray.sort(() => Math.random() - 0.5);
	Object.values(toggledCard).forEach(function (el) {
		setTimeout(() => {
			el.classList.remove("toggled");
		}, 500);
	});
	toggledCardsArray.length = 0;
	move = 0;
	winCount = 0;
	movesDisplay.innerText = `Moves: ${move}`;
	let allImagesSrc = document.getElementsByClassName('card-image');
	Object.values(allImagesSrc).forEach((el, index) => {
		el.src = imagesLinkArray[index].image;
		el.alt = imagesLinkArray[index].newAlt;
		el.id = imagesLinkArray[index].id;
	});
};
restart.addEventListener('click', restartGame);

//checking for the last clicked and current
//clicked cards and applying changes accordingly
for (var i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', function () {
		this.classList.add("toggled");
		toggledCardsArray.push(this);
		let thisImgSrc = this.querySelector('.card-image').src;
		let previousImgSrc = toggledCardsArray[toggledCardsArray.length - 2].querySelector('.card-image').src;
		if (thisImgSrc !== previousImgSrc) {
			toggledCardsArray.forEach(function (el) {
				setTimeout(() => {
					el.classList.remove("toggled");
				}, 500);
			});
			toggledCardsArray.length = 0;
			move++;
		} else {
			toggledCardsArray.length = 0;
			move++;
			winCount++;
		}
		movesDisplay.innerText = `Moves: ${move}`;
		if (winCount === 6) {
			endGame(); //call endgame
			//win condition play win sound
			document.getElementById("win-sound").play();
			setTimeout(() => {
				//alert(`Congratulations!!! You won the game in ${move} moves.`);
			}, 300);
		}
	});
}

// Function to update score on table 'highscore' based on session ID
function updateScores(move) {
    var http = new XMLHttpRequest();
    var url = 'mcard-scoreserver.php'; // Link to PHP server file
    
    // Parameters to be sent in the POST request
    var params = 'memory_score=' + move;
    
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText); // Alert the response from the server
        }
    }
    
    http.send(params); // Send the POST request with parameters
}

function endGame() {
    // Hide heading-container, cards-container, and progress-container
    document.querySelector('.heading-container').style.display = 'none';
    document.querySelector('.cards-container').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';

    // Add completion message to the #completion-message div
    const completionMessage = document.getElementById('completion-message');
    completionMessage.innerText = 'Well Done!\nThis is your score: ' + move + '\n\nKeep it up!\n\n';
	

    // Display the completion message and the end container
    completionMessage.style.display = 'block';
    const endContainer = document.querySelector('.end-container');
    endContainer.style.display = 'block';
}



function goHome() {
    window.location.href = 'http://localhost/fyp/interactive.php'; // redirect to index.php

}

function restartMemory() {
    //window.location.href = 'http://localhost/fyp/memorygame/index.php'; // Redirect to index.php
    //hide completion-message, .end-container
	// display .heading-container, .cards-container, and .progress-container
	// call restartGame()
	 // Hide completion message and end container
	 const completionMessage = document.getElementById('completion-message');
	 completionMessage.style.display = 'none';
	 const endContainer = document.querySelector('.end-container');
	 endContainer.style.display = 'none';
 
	 // Display heading container, cards container, and progress container
	 const headingContainer = document.querySelector('.heading-container');
	 headingContainer.style.display = 'block';
	 const cardsContainer = document.querySelector('.cards-container');
	 cardsContainer.style.display = 'grid'; // Assuming it was set to 'grid' initially
	 const progressContainer = document.querySelector('.progress-container');
	 progressContainer.style.display = 'flex'; // Assuming it was set to 'flex' initially
 
	 // Call restartGame() function
	 restartGame();

}
