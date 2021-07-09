let bg_img, car_img, banana_img;
let car_x, car_y, car_size;
let banana_x, banana_y, banana_size, banana_final_size;
let fallen_banana_rate;
let banana_size_rate;
let banana_init_y;
let banana_init_size;
let banana_num = 0;
let banana_num_flag = false;
let totalTime, savedTime, passedTime;

let car;
let timer;
let banana = new Array(20);

class Car{
  constructor(){
    this.car_size = 100;
    this.car_x = width/2
    this.car_y = height - this.car_size/2;
  }
  
  display(){
      image(car_img, this.car_x, this.car_y, this.car_size, this.car_size);
  }
 
  move(push_key){
    if(push_key == 'a'){
      this.car_x--;
      if(this.car_x - this.car_size/2 < 0)  this.car_x = this.car_size/2;
    }
    if(push_key=='d'){
      this.car_x++;
      if(width < this.car_x + this.car_size/2)  this.car_x = (width-this.car_size/2);
    }
  }
}

class Banana{
  constructor(){
    this.banana_x = width/2;                  //バナナの初期x値
    this.banana_y = height * 0.26;            //バナナの初期y値
    this.banana_init_y = this.banana_y;            //バナナの初期位置を記憶
    this.banana_size = 10;                    //バナナの初期サイズ
    this.banana_init_size = this.banana_size;      //バナナの初期サイズを記憶
    this.banana_size_rate = 0.2;              //バナナのサイズ拡大率
    
    //バナナを最終的にどの場所に移動させるか（底面と最初のバナナの位置の高さの比を計算）
    //-1~1までの乱数を生成し、移動地点までの傾きを求める
    this.fallen_banana_rate = float((width/2 - this.banana_size/2) / (height - this.banana_y)) * (Math.random()*2-1);
    print("コンストラクタ通過");
  }
  
  display(){
    image(banana_img, this.banana_x, this.banana_y, this.banana_size, this.banana_size);
  }
  
  move(){
    //上からバナナが移動してくる
    if((0<this.banana_y) && (this.banana_y-10<height)){
      this.banana_y += 1;  
      
      //バナナ_xの初期位置からランダム値分の割合でずらしていく
      this.banana_x = width/2 + ((this.banana_y - this.banana_init_y) * this.fallen_banana_rate);
      //バナナのサイズを大きくしていく
      this.banana_size =  this.banana_init_size + (this.banana_y - this.banana_init_y) * this.banana_size_rate;
      
    }else{
      this.banana_y = -1000; 
    }
        
    if(this.banana_y-10<height)
      print(this.banana_x, this.banana_y);
  }
}

class Timer{
  constructor(){
    //何秒ごとにバナナを生成するか
    this.totalTime = 3000;    //３秒ごと
  }
  
  start(){
    this.savedTime = Date.now();
  }
  
  isFinished(){
    this.passedTime = Date.now() - this.savedTime;
    
    if(this.passedTime > this.totalTime){
      return true;
    }else{
      return false;
    }
  }
}


function preload(){
  bg_img = loadImage('assets/road_0.8.png');
  car_img = loadImage('assets/car_back.png');
  banana_img = loadImage('assets/banana.png');
}

function setup() {
  createCanvas(612, 419); 
  car = new Car();
  timer = new Timer();
  timer.start();
}

function draw() {
  imageMode(CORNER);
  background(bg_img);
  
  //バナナや車を表示
  imageMode(CENTER);
  
  //１秒後の動作（バナナの数を増やす）
  if(timer.isFinished()){
    print("newBanana_" + banana_num);
    banana[banana_num] = new Banana();
    banana_num ++;
    
    if(banana_num == banana.length){
      banana_num_flag = true;
      banana_num = 0;
    }
    
    timer.start();
  }
  
  //要素数が超えたか超えていないかを判断するフラグ
  //要素数が超えても動作するようにした
  if(banana_num_flag){
    for(let i=0; i<banana.length; i++){
      print(i);
      banana[i].display();
      banana[i].move();
    }
  }else{
    for(let i=0; i<banana_num; i++){
      print(i);
      banana[i].display();
      banana[i].move();
    }
  }
   
  car.display();
 
  if(keyIsPressed){
    car.move(key);
  }
}