//画像に関する変数
let bg_img, car_img, banana_img, tree_img;

//オブジェクトに関する変数
let car;
//let car2;
let banana_timer, line_timer, tree_timer;
let banana = new Array(50);
let c_line = new Array(150);
let l_tree = new Array(60);
let r_tree = new Array(60);

//バナナ、センターライン、木の出現速度
//バナナとセンターラインの出現速度は同じとする
let b_time = 800;
let l_time = 800;
let t_time = 300;

//画面表示に関する変数
let step = 1;
let s_side;
let s_len;
let size_rate;
let x_axis_rate;
let y_axis_rate;
let gadget;
let mode;

//ジャイロセンサーに関する変数
let pDeviceOrientation;

//カメラに関する変数
//c_rate(capture_size_rate)：バックグラウンドに対するキャプチャ画面の割合
//let capture;
const c_rate = 1/3;

//handsfreeに関する変数
let handsfree;
let targetIndex;
let palette;

let handVector1, handVector2;

//一度実行したいときに利用
//カメラモードの読み込みに利用
let once = 1;

//音に関する変数
//let bgm;
let sound1, sound2, sound3, sound4, sound5, sound6, sound7;

function preload(){
  bg_img = loadImage('assets/road4.png');
  car_img = loadImage('assets/car_back.png');
  banana_img = loadImage('assets/banana.png');
  tree_img = loadImage('assets/tree.png');
  coin_img = loadImage('assets/coin.png');
  kinoko_img = loadImage('assets/kinoko.png');

  //bgm   = loadSound('assets/song.mp3');          //BGM
  sound1 = loadSound('assets/sound1.mp3');        //車の発射音
  sound2 = loadSound('assets/sound2.mp3');        //バナナスリップ音
  sound3 = loadSound('assets/sound3.mp3');        //画面遷移の効果音
  sound4 = loadSound('assets/sound4.mp3');        //コイン獲得音
  sound5 = loadSound('assets/sound5.mp3');        //1up獲得音
  sound6 = loadSound('assets/sound6.mp3');        //ゲームクリア
  sound7 = loadSound('assets/sound7.mp3');        //風切り音
  
  //car2 = loadModel('assets/Car.obj');
}

function setup() {
  //短辺を基準にテキスト、画像を描画
  //s_len：短辺になる方の元のキャンバスサイズ
  //createCanvas(764, 523); 
  createCanvas(windowWidth, windowHeight); 
  
  if(width > height){
    s_side = height;
    s_len = 523;
  }else{
    s_side = width;
    s_len = 764;
  }
  
  size_rate = (height * width) / (764 * 523);
  x_axis_rate = width / 764;
  y_axis_rate = height / 523;
  
  
  //print(height, width);
  //print(s_side/s_len);
  //print(size_rate);
  //print(height * 0.26 + (height - height * 0.26 ) * 523*(0.2/height));

  car = new Car();
  banana_timer = new Timer(b_time);
  line_timer = new Timer(l_time);
  tree_timer = new Timer(t_time);
  banana_timer.start();
  line_timer.start();
  tree_timer.start();
}


function draw() {  
  imageMode(CORNER);
  background(bg_img);
  
  /*
  step -> 1:初期画面　2:説明　3:ゲーム本体　4.結果
  */
  switch(step){
    case 1:
      init_display();
      break;
    
    case 2:
      explanation_display1();
      break;
    
    case 2.1:
      if(once == 1 && (mode == 2 || mode == 3)){
        Camera_mode();
        once ++;
      }
      explanation_display2();
      break;
    
    case 3:
      //バナナや車を表示
      imageMode(CENTER);
      func_tree();
      func_line();
      func_banana();
      
      car.display();
      score_display();
      
      //車のハンドル操作
      if(mode == 2 || mode == 3){
        imageMode(CORNER);
        Camera();
        Handle();
      }
      
      //ジャイロセンサーでハンドル操作
      //gyro_sensor();
      
      //キーボードでの操作
      if(keyIsPressed && (key == 'a' || key == 'd')){
          car.button_move(key);  
      }
      
      if(life <= 0) {
        sound6.play();
        //print(life ,kinoko_point, banana_hit_num ,init_life);
        deleteObj();
        step = 4;
      }
      
      break;
    
    case 4:
      end_display();
      break;
  }
  
  //タッチセンサーでの操作
  //if(isSmartphone){
    touch_screen();
  //}
  
  //model(car2);
}


function keyTyped(){
  if(step == 2){
    if(key == 1 || key == 2 || key == 3){
      if(key == 1) mode = 1;
      if(key == 2) mode = 2;
      if(key == 3) mode = 3;
      
      sound3.play();
      step = 2.1;
    }
  }
  
  if(key === 'Enter'){
    if(step != 2 && step != 3 && step != 4){
      sound3.play();
    }
    
    if(step == 1){
      deleteObj();
      step ++;
    }
    else if(step == 2.1){
      sound1.play();
      step = Math.floor(++step);       
    }
  }
}

function keyPressed(){
  if(keyCode == ESCAPE) {
    sound3.play();
    
    //escapeキーで再びゲームする人用
    replay_conf();
    step = 1; 
  }
}


function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)){
      return true;
    }
}