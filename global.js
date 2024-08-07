// 画面サイズ
const STAGE_W = 960;
const STAGE_H = 540;

let stage;
let scene_id;  // シーンID
let frame_cnt;

let player;    //プレイヤー
let enemyList; //敵の配列
let playerHP;  //プレイヤーの体力

let titleText;  // タイトル
let howToText;  // 操作説明
let pressSpaceText;