let bg_img, car_img, banana_img;
let car_x, car_y, car_size;
let banana_x, banana_y, banana_size, banana_final_size;
let fallen_banana_rate;
let banana_init_y;

let car;
let banana;

class Car{
  constructor(_car_x, _car_y, _car_size){
    car_x = _car_x;
    car_y = _car_y;
    car_size = _car_size;
    //print('a');
  }
  
  display(car_x){
    image(car_img, car_x, car_y, car_size, car_size);
    //print(car_x, car_y, car_size, car_size);
  }
 
  move(push_key){
    if(push_key == 'a'){
      car_x--;
      if(car_x < 0)  car_x = 0;
    }
    if(push_key=='d'){
      car_x++;
      if((width-car_size) < car_x)  car_x = (width-car_size);
    }
    //print('b');
    return car_x;
  }
}

class Banana{
  constructor(_banana_x, _banana_y, _banana_size){
    banana_x = _banana_x;
    banana_y = _banana_y;
    banana_size = _banana_size;
    
    banana_init_y = _banana_y;
    
    //バナナを最終的にどの場所に移動させるか（底面と最初のバナナの位置の高さの比を計算）
    //-1~1までの乱数を生成し、移動地点までの傾きを求める
    fallen_banana_rate = float(banana_x / (height - banana_y - banana_size)) * Math.floor(Math.random()*2)-1;
    //print(banana_x, banana_y, banana_size);
    //print(random_banana);
    //print(float(banana_x / (height - banana_y)));
    //print(banana_x);
    //print((height - banana_y - banana_size));
  }
  
  display(_banana_y){
    image(banana_img, banana_x, _banana_y, banana_size, banana_size);
    //print(banana_x, _banana_y, banana_size);
  }
  
  move(_banana_y){
    //print("A")
    banana_y = _banana_y +1;
    //バナナ_xの初期位置からランダム値分の割合でずらしていく
    banana_x = ((width/2) - (banana_size/2)) + ((_banana_y - banana_init_y) * fallen_banana_rate);
    
    if(banana_y-10<height)
      print(banana_x, banana_y);
    return banana_y;
  }
}


function preload(){
  bg_img = loadImage('assets/road_0.8.png');
  car_img = loadImage('assets/car_back.png');
  banana_img = loadImage('assets/banana.png');
}

function setup() {
  createCanvas(612, 419);
  car_size = 100;
  car_x = width/2 - car_size/2;
  car_y = height - car_size; 
  car = new Car(car_x, car_y, car_size);
  banana_size = 10;          //バナナのサイズの初期値
  banana_final_size = 40;    //最終的なバナナの大きさ
  banana_x = width/2 - banana_size/2;
  banana_y = height * 0.246;
  banana = new Banana(banana_x, banana_y, banana_size);
  //print(banana_x, banana_y, banana_size);
}

function draw() {
  background(bg_img);
  car.display(car_x);
  banana.display(banana_y);
  
  banana_y = banana.move(banana_y);
 
  if(keyIsPressed){
    car_x = car.move(key);
  }
}