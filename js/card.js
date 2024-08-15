// card.js

// 基本的なCardクラス
class Card extends createjs.Container {
    constructor(name, image, cost, type, effect) {
        super();
        this.name = name;
        this.cost = cost;
        this.type = type;
        this.effect = effect;

        // カードの表示
        this.cardImage = new createjs.Bitmap(image);
        this.addChild(this.cardImage);

        // カード名とコストの表示
        this.nameText = new createjs.Text(name, "20px Arial", "#ffffff");
        this.nameText.x = 10;
        this.nameText.y = 10;
        this.addChild(this.nameText);

        this.costText = new createjs.Text(cost, "20px Arial", "#ffffff");
        this.costText.x = 10;
        this.costText.y = 40;
        this.addChild(this.costText);
    }

    play(target) {
        console.log("Playing card effect on target.");
        target.takeDamage(10);  // 10のダメージを敵に与える
        console.log("Enemy's HP after damage: " + target.health); // デバッグ用ログ
    }
    
}

// DraggableCardクラス
class DraggableCard extends Card {
    constructor(name, image, cost, type, effect, stage, targetEnemy) {
        super(name, image, cost, type, effect);
        this._stage = stage;
        this.targetEnemy = targetEnemy;
        this.offset = {x: 0, y: 0};

        this.on("mousedown", this.handleMouseDown.bind(this));
        this.on("pressmove", this.handleMouseMove.bind(this));
        this.on("pressup", this.handleMouseUp.bind(this));
    }

    handleMouseDown(event) {
        this.offset = {x: this.x - event.stageX, y: this.y - event.stageY};
    }

    handleMouseMove(event) {
        this.x = event.stageX + this.offset.x;
        this.y = event.stageY + this.offset.y;
        this._stage.update();
    }

    handleMouseUp(event) {
        if (this.isDroppedOnTarget(this.targetEnemy)) {
            console.log("Target found, applying damage.");
            this.play(this.targetEnemy); // 敵に対してカードの効果を発動
            this._stage.removeChild(this); // カードをステージから削除
        } else {
            console.log("Not dropped on target, resetting position.");
            this.x = 100;
            this.y = 400;
        }
        this._stage.update();
    }
    

    isDroppedOnTarget(target) {
        const targetX = target.x;
        const targetY = target.y;
        const targetWidth = 300;  // 適切なサイズを設定
        const targetHeight = 300;
    
        console.log("Card position:", this.x, this.y);
        console.log("Target position and size:", targetX, targetY, targetWidth, targetHeight);
    
        return (
            this.x + this.getBounds().width / 2 > targetX &&
            this.x + this.getBounds().width / 2 < targetX + targetWidth &&
            this.y + this.getBounds().height / 2 > targetY &&
            this.y + this.getBounds().height / 2 < targetY + targetHeight
        );
    }
    
    
    

    play(target) {
        console.log("Playing card effect on target.");
        this.effect(target);  // 正しいターゲット（enemy）を渡す
    }
    
}

class DefenseCard extends Card {
    constructor(name, image, cost, effect, stage, target) {
        super(name, image, cost, "defense", effect, stage, target);
    }

    play(target) {
        console.log("Playing defense card effect on target.");
        this.effect(target);  // 防御力を増加させる
    }
}

class HealCard extends Card {
    constructor(name, image, cost, effect, stage, target) {
        super(name, image, cost, "heal", effect, stage, target);
    }

    play(target) {
        console.log("Playing heal card effect on target.");
        this.effect(target);  // HPを回復する
    }
}



