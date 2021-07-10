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
  
  //バナナがぶつかったかの判定
  //バナナに関するデータをバナナクラスから取得（x,y座標とバナナのサイズの３つ）
  //バナナと車との距離がバナナと車のサイズの合計より小さかったらぶつかったと判定
  //ただし車のあたり判定の面積を変更している（タイヤにバナナが当たったかで判定したいため）
  isHit(_banana){
    let banana_info = new Array(3);
    banana_info = _banana.Banana_info();
    let distance = dist(this.car_x, this.car_y, banana_info[0], banana_info[1]);
    
    if(distance < (this.car_size/3 + banana_info[2]/2)){
      return true;
    }else{
      return false;
    }
  }
}