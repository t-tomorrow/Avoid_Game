let score;
let init_frame_count;
var init_life = 3;
let life = init_life;

let world_score = new Array(3);


function init_display(){  
  imageMode(CENTER);
  func_tree();
  func_line();
  func_banana();
  
  textAlign(CENTER);
  textSize(s_side * (80/s_len));
  fill(0, 150, 220);
  text("Be an Avoider.", width/2, height/2);
  textSize(s_side * (25/s_len));
  fill('black');
  text("※Enterキー、またはタップで開始します。", width/2, height*(3/4));
}

function explanation_display1(){
  textAlign(LEFT);
  textSize(s_side*(30/s_len));
  rectMode(CENTER);
  fill(128, 128, 128, 120);
  rect(width/2, height/2, width*(9/10), height*(9/10));
  fill('black');
  text("通常モード（ラップトップパソコン、スマホ）", width*(1/15), height*(1/6));
  textSize(s_side*(20/s_len));
  //text("キーボード・タッチ操作・ジャイロセンサーで操作できます。", width*(1/15), height*(2/6));
  text("・キーボード・タッチ操作でハンドル操作ができます。", width*(1/15), height*(1/6) + height*(70/764));
  text("・'a'で左、'd'で右に移動します。", width*(1/15), height*(1/6) + height*(110/764));
  text("・画面半分から左タップで左へ、右タップで右へ移動します。" ,width*(1/15), height*(1/6) + height*(150/764));
  
  textSize(s_side*(30/s_len));  
  text("ハイスペックモード（GPU搭載パソコン推奨）", width*(1/15), height*(3/6));
  textSize(s_side*(20/s_len));
  text("・手を使ったハンドル操作で車を動かします。", width*(1/15), height*(3/6) + height*(70/764));
  text("・両手でグーを作って、カメラに映してください。", width*(1/15), height*(3/6) + height*(110/764));
  
  textSize(s_side*(30/s_len)); 
  text("モードを選択してください。", width*(1/15), height*(5/6));
  textSize(s_side*(20/s_len));
  text("１：通常モード　２：ハイスペックモード　３：ハイスペックモード（軽量）", width*(1/15), height*(5/6) + height*(40/764));
  text("※数字を入力してください。", width*(1/15), height*(5/6) + height*(70/764));  
}


function explanation_display2(){
  textAlign(CENTER);
  imageMode(CENTER);
  rectMode(CENTER);
  textSize(s_side * (30/s_len));
  fill(128, 128, 128, 120);
  rect(width/2, height/2, width*(9/10), height*(9/10));
  fill('black');
  text("このゲームは、バナナを避けていくゲームです。", width/2, height*(1/6));
  
  textAlign(LEFT);
  textSize(s_side * (25/s_len));
  text("・得点方法", width*(1/15), height*(2/7));
  textAlign(CENTER);
  textSize(s_side * (20/s_len));
  text("得点 ＝ 距離 ＋ コインポイント ＋ バナナポイント", width/2, height*(7/20));
  text("距離：フレームカウント数", width/2, height*(9/20));
  text("コインポイント：　　　の獲得数 ×500pt", width/2, height*(11/20));
  image(coin_img, width/2, height*(11/20) - height*(10/764), width*(30/764), width*(30/764));
  text("バナナポイント：　　　の回避数 ×10pt", width/2, height*(13/20));
  image(banana_img, width/2+width*(3/764), height*(13/20) - height*(10/764), width*(30/764), width*(30/764));
  
  textAlign(LEFT);
  textSize(s_side*(25/s_len));
  text("・アイテム", width*(1/15), height*(15/20));
  textAlign(CENTER);
  textSize(s_side*(20/s_len));
  image(kinoko_img, (width*(44/100)), height*(17/20)-height*(10/523), width*(30/764), width*(30/764));
  text("キノコ　　　：ライフが回復します。", width/2, height*(17/20));
  
  init_frame_count = int(frameCount);
}


function score_display(){
  let frame_point = int(frameCount) - init_frame_count;
  score = frame_point + coin_point*500 + banana_point*10;
  life = kinoko_point - banana_hit_num + init_life;
  
  rectMode(CORNER);
  stroke(0);
  fill(128, 128, 128, 120);
  rect(width - width/3, 0, width/3, height/3);
  
  textSize(s_side*(20/s_len));
  fill('black');
  text('LEVEL', width - width*(2/7), height*(1/10));
  text(int(score/1000) +1, width - width*(1/7), height*(1/10))
  text('SCORE', width - width*(2/7), height*(2/10));
  text(score, width - width*(1/7), height*(2/10));
  text('LIFE', width - width*(2/7), height*(3/10));
  text(life, width - width*(1/7), height*(3/10));
}


function end_display(){  
  let distance = score - (coin_point*500 + banana_point*10);
  
  rectMode(CENTER);
  fill(128, 128, 128, 120);
  rect(width/2, height/2, width*(4/5), height*(4/5));
  
  fill('black');
  textAlign(CENTER);
  textSize(s_side*(40/s_len));
  text('SCORE', width/2, height/5);

  textSize(s_side*(20/s_len));
  text('距離', width/5, height/3);
  text("コインポイント", width/2, height/3);
  text("バナナポイント", width*(4/5), height/3);
  
  
  textSize(s_side*(50/s_len));
  text(distance, width/5, height/3 + height*(50/523));
  text(coin_point*500, width/2, height/3 + height*(50/523));
  text(banana_point*10, width*(4/5), height/3 + height*(50/523));
  
  
  text("合計：", width*(3/10), height/2 + height*(80/523));
  text(score + " pt", width*(7/10), height/2 + height*(80/523));

  textSize(s_side*(25/s_len));
  text("※Escキー、またはタップでリプレイできます。", width/2, height*(8/10));
  
  //textSize(s_side*(30/s_len));
  //text("---NEW RECORD---", width/2, height/2 + height*(150/523));
}

function recode_display(){
  rectMode(CENTER);
  fill(128, 128, 128, 120);
  rect(width/2, height/2, width*(4/5), height*(4/5));
  
  fill('black');
  textAlign(CENTER);
  textSize(s_side*(40/s_len));
  text('WORLD RECORD', width/2, height/5);
  
  textSize(s_side*(20/s_len));
  text('🥇１位', width/5, height/3);
  text("🥈２位", width/2, height/3);
  text("🥉３位", width*(4/5), height/3);
}


//escapeキーを押された場合の警告表示
function esc_display(){
  fill('glay');
  rect(width/2, height/2, width/4, height/4, 20);
}