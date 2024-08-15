class CombatManager {
    constructor(player, enemy, stage) {
        this.player = player;
        this.enemy = enemy;
        this.stage = stage;
        this.turn = "player"; // プレイヤーのターンから開始

        this.startCombat();
    }

    startCombat() {
        this.player.startTurn();
        this.stage.update();
    }

    playerTurn(card) {
        this.player.playCard(card, this.enemy);
        if (this.enemy.health <= 0) {
            this.endCombat("Player Wins!");
        } else {
            this.turn = "enemy";
            this.enemyTurn();
        }
        this.stage.update();
    }

    enemyTurn() {
        this.enemy.takeTurn(this.player);
        if (this.player.health <= 0) {
            this.endCombat("Enemy Wins!");
        } else {
            this.turn = "player";
            this.player.startTurn();
        }
        this.stage.update();
    }

    endCombat(result) {
        alert(result);
    }
}
