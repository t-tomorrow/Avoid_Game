class Car{
  constructor(){
    //this.car_size = s_side * (110/s_len);                   //createCanvas(764, 523)の時、size=110だった。
    //this.car_size = s_side * (100/s_len); 
    this.car_size = banana_Maxsize * 2;
    this.car_x = width/2;
    this.car_y = height - this.car_size/2;
  }
  
  display(){
      image(car_img, this.car_x, this.car_y, this.car_size, this.car_size);
  }
 
  //ボタンを使って操作を行うとき
  button_move(push_key){
    if(push_key == 'a'){
      this.car_x -= 2 * x_axis_rate;
      if(this.car_x - this.car_size/2 < 0)  this.car_x = this.car_size/2;
    }
    if(push_key=='d'){
      this.car_x += 2 * x_axis_rate;
      if(width < this.car_x + this.car_size/2)  this.car_x = (width-this.car_size/2);
    }
  }
  
  //カメラからの映像を使って操作を行うとき
  handle_move(arg){
    //print(arg);
    if((-1 <= arg) && (arg < -0.7)){
      this.car_x -= 3 * x_axis_rate;
    }else if((-0.7 <= arg) && (arg < -0.4)){
      this.car_x -= 2 * x_axis_rate;
    }else if((-0.4 <= arg) && (arg < -0.1)){
      this.car_x -= 1 * x_axis_rate;
    }else if((0.1 <= arg) && (arg < 0.4)){
      this.car_x += 1 * x_axis_rate;
    }else if((0.4<= arg) && (arg < 0.7)){
      this.car_x += 2 * x_axis_rate;
    }else if((0.7 <= arg) && (arg <= 1)){
      this.car_x += 3 * x_axis_rate;
    }else{
      return;
    }
    
    if(this.car_x - this.car_size/2 < 0)      this.car_x = this.car_size/2;
    if(width < this.car_x + this.car_size/2)  this.car_x = (width-this.car_size/2);
  }
  
  //タッチセンサーを使って操作する場合
  touch_move(_x){
    if(_x < width/2){
      this.car_x -= 2 * x_axis_rate;
      if(this.car_x - this.car_size/2 < 0)  this.car_x = this.car_size/2;
    }else{
      this.car_x += 2 * x_axis_rate;
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
  
  end(){
    this.car_x = 0;
    this.car_y = -1000;
  }
}