function showGameOver() {
    var go = new createjs.Text("Game Over!", "32px serif", "white");
    go.x = STAGE_W/2 - go.getMeasuredWidth()/2
    go.y = STAGE_H/2 - go.getMeasuredHeight()/2
    stage.addChild(go);
    stage.update();
    // 各種イベントをまとめて解除
    createjs.Ticker.removeAllEventListeners();
    stage.removeAllEventListeners();
    }