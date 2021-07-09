let bg_img, car_img, banana_img;
let banana_num = 0;
let banana_num_flag = false;

let car;
let timer;
let banana = new Array(20);

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
      //print(i);
      banana[i].display();
      banana[i].move();
    }
  }else{
    for(let i=0; i<banana_num; i++){
      //print(i);
      banana[i].display();
      banana[i].move();
    }
  }
   
  car.display();
 
  if(keyIsPressed){
    car.move(key);
  }
}