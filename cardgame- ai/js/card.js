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
            this.x = 100;
            this.y = 100;
        }
        this._stage.update();
    }

    isDroppedOnTarget(target) {
        const targetBounds = target.getBounds();
        return (
            this.x > target.x &&
            this.x < target.x + targetBounds.width &&
            this.y > target.y &&
            this.y < target.y + targetBounds.height
        );
    }

    play(target) {
        this.effect(target);
    }
}
