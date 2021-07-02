let bg_img;
let car_img;
let banana_img;
let car_x;
let car_y;
let car_width
let car_height

let car;

function preload(){
  bg_img = loadImage('assets/road.png');
  car_img = loadImage('assets/car_back.png');
  banana_img = loadImage('assets/banana.png');
}

function setup() {
  createCanvas(447, 346);
  car_x = 100;
  car_y = 250;
  car_width = 100;
  car_height = 100;
  
  //car = new Car(100, 250, 100, 100);
}

function draw() {
  background(bg_img);
  image(car_img, car_x, car_y, car_width, car_height)
 
  if(keyIsPressed){
//    car.move(key);
    
    if(key=='a'){
      car_x--;
      if(car_x < 0){
        car_x = 0;
      } 
    }
    if(key=='d'){
      car_x++;
      if((width-car_width) < car_x){
        car_x = (width-car_width);
      }
    }

  }

}