function Handle() {
  const hands = handsfree.data?.hands;

  // 手が検出されなければreturn
  if (!hands?.multiHandLandmarks) return;

  // 両方のが検出されなければreturn
  if (!hands?.multiHandLandmarks[0]) return;
  if (!hands?.multiHandLandmarks[1]) return;

  const hand_0 = hands.multiHandLandmarks[0];
  const hand_1 = hands.multiHandLandmarks[1];
  
  //delta：差分, normal：法線、垂直, horizontal：横軸
  let vectorDelta = Array(targetIndex.length);
  let each_normalVector = Array(targetIndex.length);
  let whole_normalVector = createVector(0, 0);
  const HorizontalVector = createVector(100, 0);
  
  //handCenter：指同士の中心座標
  //normalLine：指同士の中心座標における指同士つないだ線に対する法線ベクトルの終点の座標
  //normalLine_length：法線ベクトルの長さ(矢印の長さ)
  let handCenter_x, handCenter_y, normalLine_x, normalLine_y;
  const normalLine_length = 50;
  
  //手の位置の中心地点の基準として中指を定義
  const mid_finger = int((targetIndex.length) /2);
  
  strokeWeight(2);
  for (let i = 0; i < targetIndex.length; i++) {
    
  //複数の指同士をつないだ線を表示
    stroke(palette[i]);
    line((width - hand_0[targetIndex[i]].x * width) * c_rate,
         (hand_0[targetIndex[i]].y * height) * c_rate,
         (width - hand_1[targetIndex[i]].x * width) * c_rate,
         (hand_1[targetIndex[i]].y * height) * c_rate
        );
    
  //指同士直接つないだ線に対するベクトルの法線ベクトルを計算
  //normalize()：単位ベクトルに変換する処理的なもの
    vectorDelta[i] = p5.Vector.sub(handVector2[i], handVector1[i]);
    vectorDelta[i].normalize();
    
    //法線ベクトルの向きが下向きにならないための配慮
    if(vectorDelta[i].x > 0){
      each_normalVector[i] = createVector(-vectorDelta[i].y, vectorDelta[i].x);
    }else{
      each_normalVector[i] = createVector(vectorDelta[i].y, -vectorDelta[i].x);
    }
    
    whole_normalVector = p5.Vector.add(whole_normalVector, each_normalVector[i]);
    
  /* 
  ------------------------------------------------------------------
  それぞれの指に対して動作が見たい場合... 
  
  
  //指同士つないだ線に対する法線ベクトルの作成準備
    handCenter_x[i] = (handVector1[i].x + handVector2[i].x)/2;
    handCenter_y[i] = (handVector1[i].y + handVector2[i].y)/2;
    normalLine_x[i] = handCenter_x[i] - each_normalVector[i].x * normalLine_length;
    normalLine_y[i] = handCenter_y[i] - each_normalVector[i].y * normalLine_length;
    
    
  //指それぞれの法線ベクトルを表示
    stroke(255, 128, 0);
    line(handCenter_x[i], handCenter_y[i], normalLine_x[i], normalLine_y[i]);
    ---------------------------------------------------------------
    
    //それぞれの指に対しての動作確認用
    print("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    print("fingerIndex：" + i);
    print("左手：" + handVector1[i].x, handVector1[i].y);
    print("右手：" + handVector2[i].x, handVector2[i].y);
    print(handCenter_x[i], handCenter_y[i], normalLine_x[i], normalLine_y[i]);
    if(normalLine_y[i] > handCenter_y[i])  print("下向き");
    print("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    --------------------------------------------------------------
    */
  }
  
  whole_normalVector.normalize();
  
  //中指(middle_finger)のつないだ線に対する法線ベクトルに必要な座標
  handCenter_x = ((handVector1[mid_finger].x + handVector2[mid_finger].x)/2) * c_rate;
  handCenter_y = ((handVector1[mid_finger].y + handVector2[mid_finger].y)/2) * c_rate;
  normalLine_x = (handCenter_x - whole_normalVector.x * normalLine_length);
  normalLine_y = (handCenter_y - whole_normalVector.y * normalLine_length);
  
  //print(handCenter_x, handCenter_y, normalLine_x, normalLine_y);
  
  //法線ベクトルを表示
  //start_point：法線ベクトルの始点, end_point：法線ベクトル
  let start_point = createVector(handCenter_x, handCenter_y);
  let NormalVector = createVector(normalLine_x -handCenter_x, normalLine_y - handCenter_y);
  drawArrow(start_point, NormalVector);
  
  //法線ベクトルの始点からx軸に対して平行なベクトルと法線ベクトルとの角度を調べる
  //NormalVector：法線ベクトル, HorizontalVector：法線ベクトルの始点からx軸に対して平行なベクトル
  //cosθ = a・b / (|a| * |b|)
  //drawArrow(start_point, HorizontalVector);
  let handle_arg = NormalVector.dot(HorizontalVector) / (mag(NormalVector.x, NormalVector.y) * mag(HorizontalVector.x, HorizontalVector.y));
  
  
  car.handle_move(handle_arg);
  

  
  /*
  //指を結ぶすべての線に対する平均の法線ベクトル
  //線で表示
  stroke(255, 128, 0);
  strokeWeight(30);
  line(handCenter_x, handCenter_y, normalLine_x, normalLine_y);
  //line(normalLine_x,
  //     normalLine_y,
  //     -(normalLine_x - handCenter_x) + handCenter_x,
  //     -(normalLine_y - handCenter_y) + handCenter_y       
  //    );
  */
  
  
    //print("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
    //print("左手：" + handVector1[mid_finger].x, handVector1[mid_finger].y);
    //print("右手：" + handVector2[mid_finger].x, handVector2[mid_finger].y);
    //print(handCenter_x, handCenter_y, normalLine_x, normalLine_y);
    //if(normalLine_y > handCenter_y)  print("下向き");
    //print("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
  
  
  //指が移動したら指の位置を再定義
  for (let i = 0; i < targetIndex.length; i++){
    handVector1[i].x = width - hand_0[targetIndex[i]].x * width;
    handVector1[i].y = hand_0[targetIndex[i]].y * height;
    handVector2[i].x = width - hand_1[targetIndex[i]].x * width;
    handVector2[i].y = hand_1[targetIndex[i]].y * height;
  }
}



// 矢印を表示
// heading()：ベクトルの回転角の計算
// mag()：ベクトルの大きさ、長さを計算
function drawArrow(base, vec) {
  push();
  stroke(255, 128, 0);
  strokeWeight(10);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 10;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}