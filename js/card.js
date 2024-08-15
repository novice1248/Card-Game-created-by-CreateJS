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
        this.effect(target);
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
            this.play(this.targetEnemy); // 敵に対してカードの効果を発動
            this._stage.removeChild(this); // カードをステージから削除
        } else {
            // カードを元の位置に戻す
            this.x = 100;
            this.y = 400;
        }
        this._stage.update();
    }

    isDroppedOnTarget(target) {
        const targetX = target.x;
        const targetY = target.y;
        const targetWidth = 100;  // Shapeの幅を直接指定
        const targetHeight = 100; // Shapeの高さを直接指定
    
        return (
            this.x > targetX &&
            this.x < targetX + targetWidth &&
            this.y > targetY &&
            this.y < targetY + targetHeight
        );
    }
    
    

    play(target) {
        this.effect(target);
    }
}

