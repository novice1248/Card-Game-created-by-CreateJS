// DraggableCardクラス
class DraggableCard extends Card {
  constructor(name, image, cost, effect, stage, targetEnemy) {
    super(name, image, cost, effect);
    this._stage = stage; // `stage`が正しく渡されているか確認
    this.targetEnemy = targetEnemy;
    this.offset = { x: 0, y: 0 };

    this.on("mousedown", this.handleMouseDown.bind(this));
    this.on("pressmove", this.handleMouseMove.bind(this));
    this.on("pressup", this.handleMouseUp.bind(this));
  }

  handleMouseDown(event) {
    this.offset = { x: this.x - event.stageX, y: this.y - event.stageY };
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
    const targetWidth = 300; // 適切なサイズを設定
    const targetHeight = 300;

    console.log("Card position:", this.x, this.y);
    console.log(
      "Target position and size:",
      targetX,
      targetY,
      targetWidth,
      targetHeight
    );

    return (
      this.x + this.getBounds().width / 2 > targetX &&
      this.x + this.getBounds().width / 2 < targetX + targetWidth &&
      this.y + this.getBounds().height / 2 > targetY &&
      this.y + this.getBounds().height / 2 < targetY + targetHeight
    );
  }

  play(target) {
    console.log("Playing card effect on target.");
    this.effect(target); // 正しいターゲット（enemy）を渡す
  }
}

class DefenseCard extends DraggableCard {
  constructor(name, image, cost, effect, stage, target) {
    super(name, image, cost, effect, stage, target);
  }

  play(target) {
    this.effect(target); // 防御力を増加させる
  }
}

class HealCard extends DraggableCard {
  constructor(name, image, cost, effect, stage, target) {
    super(name, image, cost, effect, stage, target);
  }

  play(target) {
    this.effect(target);
  }
}
