class Player {
    constructor() {
        this.health = 50; 
        this.energy = 3;
        this.deck = [];
        this.hand = [];
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log("Player health: " + this.health);
    }

    drawCards(num) {
        // デッキからカードを引く処理
        for (let i = 0; i < num; i++) {
            if (this.deck.length > 0) {
                let drawnCard = this.deck.pop();
                this.hand.push(drawnCard);
            }
        }
    }

    playCard(card, target) {
        if (card.cost <= this.energy) {
            card.play(target);
            this.energy -= card.cost;
            this.hand.splice(this.hand.indexOf(card), 1);
        }
    }

    startTurn() {
        this.energy = 3;
        this.drawCards(5);
    }
}
