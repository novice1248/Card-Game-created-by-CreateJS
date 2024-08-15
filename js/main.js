window.onload = function () {
  const canvas = document.getElementById("gameCanvas");
  const stage = new createjs.Stage(canvas);

  let bg = new createjs.Shape();
  bg.graphics.beginFill("pink").drawRect(0, 0, 960, 540);
  stage.addChild(bg);

  let player = new Player();
  let enemy = new Enemy("Slime", 30);

  player.x = 100; // プレイヤーのX座標
  player.y = 400; // プレイヤーのY座標

  player.getBounds = function () {
    return { x: player.x, y: player.y, width: 100, height: 100 };
  };

  let enemyShape = new createjs.Shape();
  enemyShape.graphics.beginFill("red").drawRect(0, 0, 100, 100);
  enemyShape.x = 500;
  enemyShape.y = 200;
  enemyShape.setBounds(0, 0, 100, 100); // setBoundsを使用してBoundsを設定
  stage.addChild(enemyShape);

  let attackCard = new DraggableCard(
    "Attack+",
    "assets/attack_plus.png",
    1,
    "attack",
    function () {
      enemy.takeDamage(10); // `enemyShape`ではなく、`enemy`にダメージを与える
    },
    stage,
    enemyShape // 衝突判定にはenemyShapeを使う
  );

  let defenseCard = new DefenseCard(
    "Shield+",
    "assets/defense_card.png",
    1,
    function (target) {
      target.defense += 10; // 防御力を増加
    },
    stage,
    player // ターゲットをプレイヤーに設定
  );

  let healCard = new HealCard(
    "Heal+",
    "assets/heal_card.png",
    1,
    function (target) {
      target.health += 20; // HPを回復
      if (target.health > 50) target.health = 50; // HPの上限を設定
    },
    stage,
    player // ターゲットをプレイヤーに設定
  );

  //手札への追加
  player.hand.push(defenseCard);
  player.hand.push(healCard);

  attackCard.x = 100;
  attackCard.y = 400;
  stage.addChild(attackCard);

  // カードを画面に表示
  defenseCard.x = 150; // 表示位置を設定
  defenseCard.y = 400;
  stage.addChild(defenseCard);

  healCard.x = 250;
  healCard.y = 400;
  stage.addChild(healCard);

  defenseCard.on("pressup", function () {
    if (defenseCard.isDroppedOnTarget(player)) {
      defenseCard.play(player);
      stage.removeChild(defenseCard);
    }
  });

  healCard.on("pressup", function () {
    if (healCard.isDroppedOnTarget(player)) {
      healCard.play(player);
      stage.removeChild(healCard);
    }
  });

  // プレイヤーのターンでカードを使用できるように設定
  defenseCard.on("pressup", function () {
    if (defenseCard.isDroppedOnTarget(player)) {
      defenseCard.play(player);
      stage.removeChild(defenseCard);
    }
  });

  healCard.on("pressup", function () {
    if (healCard.isDroppedOnTarget(player)) {
      healCard.play(player);
      stage.removeChild(healCard);
    }
  });

  const playerHealthText = new createjs.Text(
    "Player HP: " + player.health,
    "20px Arial",
    "#ffffff"
  );
  playerHealthText.x = 10;
  playerHealthText.y = 10;
  stage.addChild(playerHealthText);

  const enemyHealthText = new createjs.Text(
    "Enemy HP: " + enemy.health,
    "20px Arial",
    "#ffffff"
  );
  enemyHealthText.x = 500;
  enemyHealthText.y = 10;
  stage.addChild(enemyHealthText);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", function () {
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

    setTimeout(function () {
      enemy.attack(player);
      if (player.health > 0) {
        setTimeout(function () {
          playerTurn();
        }, 1000);
      }
    }, 1000);
  }

  function playerTurn() {
    attackCard.on("pressup", function () {
      if (attackCard.isDroppedOnTarget(enemyShape)) {
        attackCard.play(enemy); // 敵にダメージを与える
        stage.removeChild(attackCard);
        nextTurn();
      } else {
        attackCard.x = 100;
        attackCard.y = 400;
      }
    });
  }

  playerTurn();
};
