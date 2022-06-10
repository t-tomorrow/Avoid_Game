function Camera() {
  // 映像を左右反転させて表示
  //画面に対する横幅・縦幅の1/3の大きさでカメラ映像を読み込み
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, (width - width *c_rate), 0, width *c_rate, height *c_rate);
  pop();
}


function Camera_mode(){
   // webカメラの映像を準備
    capture = createCapture(VIDEO);
    capture.hide();

    // handsfreeのhandモデルを準備
    handsfree = new Handsfree({
      showDebug: false,
      hands: true
    });

    // handsfreeを開始
    handsfree.start();

    if(mode == 2){
      //５本の指で操作する場合
      targetIndex = [4, 8, 12, 16, 20];
      palette = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"];
    }else{
      //３本の指で操作する場合
      targetIndex = [4, 12, 20];
      palette = ["#9b5de5", "#f15bb5", "#fee440"];
    }
    
    //指定した指の数だけベクトルの配列を作成する
    handVector1 = Array(targetIndex.length);
    handVector2 = Array(targetIndex.length);
      
    //createVector:ベクトルを格納するためのクラスを作成。
    //ベクトルは大きさと向きの両方を持つエンティティ  
    for(let i=0; i<targetIndex.length; i++){
      handVector1[i] = createVector(0, 0);
      handVector2[i] = createVector(0, 0);
    }  
}