class Car{
  constructor(car_x, car_y, car_width, car_height){
    this.car_x = car_x;
    this.car_y = car_y;
    this.car_width = car_width;
    this.car_height = car_height;
  }
 
  move(push_key){
    if(push_key == 'a'){
      car_x--;
      if(car_x < 0){
        car_x = 0
      }
    }
    if(push_key=='d'){
      car_x++;
      if((width-car_width) < car_x){
        car_x = (width-car_width);
      }
    }
}