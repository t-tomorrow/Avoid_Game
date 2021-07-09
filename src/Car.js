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