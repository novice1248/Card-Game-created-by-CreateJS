// マウスイベントの登録
window.addEventListener("click", handleClick);
window.addEventListener("dblclick", handleDblClick);
// クリックした時の処理
function handleClick(event) {
    if (scene_id == 0) {
        scene_id = 1;
        stage.removeChild(titleText);
        stage.removeChild(howToText);
        stage.removeChild(pressSpaceText);
        stage.addChild(player);
    }
  stage.update();
}
// ダブルクリックした時の処理
function handleDblClick(event) {
  stage.update();
}
