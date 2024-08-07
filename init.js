// 読み込みが終わってから初期化
window.addEventListener("load", init);
function init() {
  // canvasを取得
  stage = new createjs.Stage("myCanvas");
  scene_id = 0;
  frame_cnt = 0;

  // 背景を作成
  let bg = new createjs.Shape();
  bg.graphics.beginFill("black").drawRect(0, 0, STAGE_W, STAGE_H);
  stage.addChild(bg);

  // 自機を作成
  player = new createjs.Bitmap('img/player.png');
  player.crossOrigin = "Anonymous";
  player.x = 100;
  player.y = STAGE_H / 2;
  player.scaleX = 0.3;
  player.scaleY = 0.3;

  //initTitleの呼び出し
  initTitle();

  // tickイベントの登録
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", handleTick);
}

function initTitle() {
  // タイトル
  titleText = new createjs.Text("Card Game", "40px sans-serif", "white");
  titleText.x = STAGE_W / 2 - titleText.getMeasuredWidth() / 2;
  titleText.y = 50;
  stage.addChild(titleText);
  // 操作説明
  howToText = new createjs.Text("", "20px sans-serif", "white");
  howToText.x = STAGE_W / 2 - howToText.getMeasuredWidth() / 2;
  howToText.y = 100;
  stage.addChild(howToText);
  pressSpaceText = new createjs.Text(
    "Press Space key to start",
    "40pxsans-serif",
    "white"
  );
  pressSpaceText.x = STAGE_W / 2 - pressSpaceText.getMeasuredWidth() / 2;
  pressSpaceText.y = 150;
  stage.addChild(pressSpaceText);
}
