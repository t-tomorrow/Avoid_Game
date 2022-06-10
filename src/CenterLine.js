let l_pre_score = 0;                //以前のスコアを保存。
let now_l_acceleration = 0.01;      //現在の加速度を保持。

class CenterLine{
  constructor(){
    this.line_x = width/2;
    this.line_y = height * 0.27;
    this.line_init_y = this.line_y;
    
    //this.line_width = s_side * (1/s_len);            //createCanvas(764, 523)の時line_width=1だった。 
    this.line_width = 1 * x_axis_rate;
    this.line_height = 3 * y_axis_rate;              //createCanvas(764, 523)の時line_height=5だった。
    this.line_init_width = this.line_width;
    this.line_init_height = this.line_height;
    //this.line_size_rate = 523 * (0.1/height);
    this.line_size_rate = 523 * (0.1/height) * (s_side / s_len);
    
    this.line_speed = 0.1;
    
  }
  
  display(){
    fill(183);
    rectMode(CENTER);
    noStroke();
    rect(this.line_x, this.line_y, this.line_width, this.line_height);
  }
  
  move(){
    //上から白線が移動してくる
    if((0<this.line_y) && (this.line_y<height + this.line_y)){
      this.line_y += this.line_speed;  

      //ラインのサイズを大きくしていく
      this.line_width = this.line_init_width + (this.line_y - this.line_init_y) * (this.line_size_rate/6);
      this.line_height =  this.line_init_height + (this.line_y - this.line_init_y) * this.line_size_rate;
      
    }else{
      this.line_y = -1000; 
    }
    
    
    //スコアが1000点増えるごとに加速度を増やす。
    this.line_speed += now_l_acceleration;
    
    if(int(score/1000) > l_pre_score){
      now_l_acceleration += int(score/1000) * 0.002;
      if(l_time > 100){
        l_time -= (20 + int(score/1000) *15); 
      }else{
        l_time = 10;
      }
       
      l_pre_score = int(score/1000);
      line_timer = new Timer(l_time);
      line_timer.start();
    }
  }
  
  end(){
    this.line_x = 0;
    this.line_y = -1000;
  }
}