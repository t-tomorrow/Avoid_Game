const tree_speed = 0.1;

let now_t_acceleration = 0.1;     //現在の加速度を保持。
let t_pre_score = 0;              //以前のスコアを保存。

//道路の左側の木
class L_Tree{
  constructor(){
    this.tree_size = s_side * (10/s_len);
    this.tree_init_size = this.tree_size;
    this.tree_x = (width/2 - this.tree_size) * Math.random();
    this.tree_init_x = this.tree_x;
    this.tree_y = height * 0.26;
    this.tree_init_y = this.tree_y;
    this.tree_size_rate = s_side * (0.5/s_len);
    //this.tree_size_rate = 0.1 * size_rate;
    this.tree_speed = tree_speed;
  }
  
  display(){
    image(tree_img, this.tree_x, this.tree_y, this.tree_size, this.tree_size);
  }
  
  move(){
    //上から木が移動してくる
    if((0 < this.tree_x + this.tree_size/2) && (this.tree_x + this.tree_size/2 <width/2)){
      this.tree_y += this.tree_speed;  
      
      //木_xの初期位置からランダム値分の割合でずらしていく
      this.tree_x = this.tree_init_x + (-2.3) * (this.tree_y - this.tree_init_y);
      //木のサイズを大きくしていく
      this.tree_size =  this.tree_init_size + (this.tree_y - this.tree_init_y) * this.tree_size_rate;
      
    }else{
      this.tree_y = -1000; 
    }
    
    //スコアが1000点増えるごとに加速度を増やす。
    this.tree_speed += now_t_acceleration;
    
    if(int(score/1000) > t_pre_score){
      now_t_acceleration += int(score/1000) * 0.004;
      if(t_time >= 20){
        t_time -= 20;
      }else{
        t_time = 10;
      }
        
      t_pre_score = int(score/1000);
      tree_timer = new Timer(t_time);
      tree_timer.start();
    }
  }
  
  end(){
    this.tree_x = -100;
    this.tree_y = -1000;
  }
}


//道路の右側の木
class R_Tree{
  constructor(){
    this.tree_size = s_side * (10/s_len);              //createCanvas(764, 523)の時tree_size=10だった。
    this.tree_init_size = this.tree_size;
    this.tree_x = (width/2 - this.tree_size) * Math.random() +(width/2 + this.tree_size);
    this.tree_init_x = this.tree_x;
    this.tree_y = height * 0.26;
    this.tree_init_y = this.tree_y;
    this.tree_size_rate = s_side * (0.5/s_len);
    this.tree_speed = tree_speed;
  }
  
  display(){
    image(tree_img, this.tree_x, this.tree_y, this.tree_size, this.tree_size);
  }
  
  move(){
    //上から木が移動してくる
    if((width/2 <  this.tree_x - this.tree_size/2) && (this.tree_x - this.tree_size/2 < width)){
      this.tree_y += this.tree_speed;  
      
      //木_xの初期位置からランダム値分の割合でずらしていく
      this.tree_x = this.tree_init_x + (2.3) *(this.tree_y - this.tree_init_y);
      //木のサイズを大きくしていく
      this.tree_size =  this.tree_init_size + (this.tree_y - this.tree_init_y) * this.tree_size_rate;
      
    }else{
      this.tree_y = -1000; 
    }
    
    //スコアが1000点増えるごとに加速度を増やす。
    this.tree_speed += now_t_acceleration;
    
    if(int(score/1000) > t_pre_score){
      now_t_acceleration += int(score/1000) * 0.004; 
    }
  }
  
  end(){
    this.tree_x = -100;
    this.tree_y = -1000;
  }
}