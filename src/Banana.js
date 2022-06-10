let banana_point = 0;
let banana_hit_num = 0;
let kinoko_point = 0;
let coin_point = 0;

let now_acceleration = 0.01;                        //現在の加速度を保持。
let b_pre_score = 0;                                //以前のスコアを保存。

let banana_Maxsize;             //車のサイズを必ずバナナよりも大きくするための変数


class Banana{  
  constructor(obj_num){
    this.banana_x = width/2;                                    //バナナの初期x値
    this.banana_y = height * 0.26;                              //バナナの初期y値
    this.banana_init_y = this.banana_y;                         //バナナの初期位置を記憶
    //this.banana_size = s_side * (5/s_len);                    //バナナの初期サイズ。createCanvas(764, 523)の時size=10だった。
    this.banana_size = 1.5 * size_rate; 
    this.banana_init_size = this.banana_size;                   //バナナの初期サイズを記憶
    //this.banana_size_rate = 523*(0.2/height);       //バナナのサイズ拡大率(0.13)
    this.banana_size_rate = 523*(0.12/height) * (s_side / s_len);       //バナナのサイズ拡大率(0.13)
    this.banana_speed = 0.1;                                    //バナナの初期速度
    this.acceleration = now_acceleration;                       //バナナの加速度
    
    this.obj = obj_num;
    
    //バナナを最終的にどの場所に移動させるか（底面と最初のバナナの位置の高さの比を計算）
    //-1~1までの乱数を生成し、移動地点までの傾きを求める
    this.fallen_banana_rate = float((width/2 - this.banana_size/2) / (height - this.banana_y)) * (Math.random()*2-1);
    
    banana_Maxsize =  this.banana_init_size + (height - this.banana_init_y) * this.banana_size_rate;
  }
  
  
  //1:バナナ, 2:コイン, 3:キノコを表示
  display(){
    if(this.obj == 1){
      image(banana_img, this.banana_x, this.banana_y, this.banana_size, this.banana_size);
    }else if(this.obj == 2){
      image(coin_img, this.banana_x, this.banana_y, this.banana_size, this.banana_size);
    }else{
      image(kinoko_img, this.banana_x, this.banana_y, this.banana_size, this.banana_size);
    }
  }
  
  
  move(){
    //上からバナナが移動してくる
    if((0<this.banana_y) && (this.banana_y<height+this.banana_size)){
      this.banana_y += this.banana_speed;  
      
      //バナナ_xの初期位置からランダム値分の割合でずらしていく
      this.banana_x = width/2 + ((this.banana_y - this.banana_init_y) * this.fallen_banana_rate);
      //バナナのサイズを大きくしていく(y座標依存→x座標考慮する)
      this.banana_size =  this.banana_init_size + (this.banana_y - this.banana_init_y) * this.banana_size_rate;      
    }else{  
      //バナナをうまくよけれた場合
      if(step == 3 && height+this.banana_size <= this.banana_y){
        sound7.play();
        banana_point ++;
      }
      this.banana_y = -1000; 
    }
    
    //スコアが1000点増えるごとに加速度を増やす。
    this.banana_speed += now_acceleration;
    
    if(int(score/1000) > b_pre_score){
      now_acceleration += int(score/1000) * 0.002;
      
      if(b_time > 400){
        b_time -= (20 + int(score/1000) *15); 
      }else if(300 < b_time && b_time<= 400){
        b_time -= 20;
      }
      else if(10 < b_time && b_time <= 300){
        b_time -= 10;
      }else{
        b_time = 10;
      }
      b_pre_score = int(score/1000);
      banana_timer = new Timer(b_time);
      banana_timer.start();      
    } 
  }
  
  //踏まれた場合の処理
  Stepped_on(){
    this.banana_y = -1000;
    
    if(this.obj == 1){
      sound2.play();
      banana_hit_num ++;
    }else if(this.obj == 2){
      sound4.play();
      coin_point ++;
    }else{
      sound5.play();
      kinoko_point ++;
    }
  }
  
  //バナナの位置とサイズを取得
  //バナナと車がぶつかったかを判定するときに利用(Car.js)
  Banana_info(){
    let banana_info = new Array(3);
    banana_info[0] = this.banana_x;
    banana_info[1] = this.banana_y;
    banana_info[2] = this.banana_size;
    
    return banana_info;
   } 
  
  end(){
    this.banana_x = 0;
    this.banana_y = -1000;
  }
}