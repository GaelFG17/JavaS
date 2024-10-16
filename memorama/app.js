// FILE: app.js
document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'card1', img: 'img/card1.png' },
        { name: 'card1', img: 'img/card1.png' },
        { name: 'card2', img: 'img/card2.png' },
        { name: 'card2', img: 'img/card2.png' },
        { name: 'card3', img: 'img/card3.png' },
        { name: 'card3', img: 'img/card3.png' },
        { name: 'card4', img: 'img/card4.png' },
        { name: 'card4', img: 'img/card4.png' },
        { name: 'card5', img: 'img/card5.png' },
        { name: 'card5', img: 'img/card5.png' },
        { name: 'card6', img: 'img/card6.png' },
        { name: 'card6', img: 'img/card6.png' },
        { name: 'card7', img: 'img/card7.png' },
        { name: 'card7', img: 'img/card7.png' },
        { name: 'card8', img: 'img/card8.png' },
        { name: 'card8', img: 'img/card8.png' }
    ];

    const gameBoard = document.querySelector('.memory-game');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function createBoard() {
        cardsArray.sort(() => 0.5 - Math.random());
        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.name = card.name;

            const frontFace = document.createElement('img');
            frontFace.classList.add('front-face');
            frontFace.src = card.img;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            gameBoard.appendChild(cardElement);

            cardElement.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    createBoard();
});