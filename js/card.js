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


