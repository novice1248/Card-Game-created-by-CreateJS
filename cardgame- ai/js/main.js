window.onload = function() {
    const canvas = document.getElementById("gameCanvas");
    const stage = new createjs.Stage(canvas);

    let bg = new createjs.Shape();
            bg.graphics.beginFill("pink").drawRect(0,0,960,540);
            stage.addChild(bg);

    let player = new Player();
    let enemy = new Enemy("Slime", 30);

    let enemyShape = new createjs.Shape();
    enemyShape.graphics.beginFill("red").drawRect(0, 0, 100, 100);
    enemyShape.x = 500;
    enemyShape.y = 200;
    stage.addChild(enemyShape);

    let attackCard = new DraggableCard(
        "Attack+", 
        "assets/attack_plus.png", 
        1, 
        "attack", 
        function(target) {
            target.takeDamage(10); // 敵のHPを減らす
        },
        stage,
        enemyShape
    );

    attackCard.x = 100;
    attackCard.y = 400;
    stage.addChild(attackCard);

    const playerHealthText = new createjs.Text("Player HP: " + player.health, "20px Arial", "#ffffff");
    playerHealthText.x = 10;
    playerHealthText.y = 10;
    stage.addChild(playerHealthText);

    const enemyHealthText = new createjs.Text("Enemy HP: " + enemy.health, "20px Arial", "#ffffff");
    enemyHealthText.x = 500;
    enemyHealthText.y = 10;
    stage.addChild(enemyHealthText);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function() {
        playerHealthText.text = "Player HP: " + player.health;
        enemyHealthText.text = "Enemy HP: " + enemy.health;
        stage.update();
    });

    function nextTurn() {
        if (enemy.health <= 0) {
            alert("You won!");
            return;
        }
        if (player.health <= 0) {
            alert("You lost!");
            return;
        }

        setTimeout(function() {
            enemy.attack(player);
            if (player.health > 0) {
                setTimeout(function() {
                    playerTurn();
                }, 1000);
            }
        }, 1000);
    }

    function playerTurn() {
        attackCard.on("pressup", function() {
            if (attackCard.isDroppedOnTarget(enemyShape)) {
                attackCard.play(enemy);
                stage.removeChild(attackCard);
                nextTurn();
            } else {
                // ドロップしなかった場合、カードを元の位置に戻す
                attackCard.x = 100;
                attackCard.y = 400;
            }
        });
    }

    playerTurn();
};
