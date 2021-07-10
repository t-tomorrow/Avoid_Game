class Banana{  
  constructor(){
    this.banana_x = width/2;                  //バナナの初期x値
    this.banana_y = height * 0.26;            //バナナの初期y値
    this.banana_init_y = this.banana_y;       //バナナの初期位置を記憶
    this.banana_size = 10;                    //バナナの初期サイズ
    this.banana_init_size = this.banana_size; //バナナの初期サイズを記憶
    this.banana_size_rate = 0.2;              //バナナのサイズ拡大率
    
    //バナナを最終的にどの場所に移動させるか（底面と最初のバナナの位置の高さの比を計算）
    //-1~1までの乱数を生成し、移動地点までの傾きを求める
    this.fallen_banana_rate = float((width/2 - this.banana_size/2) / (height - this.banana_y)) * (Math.random()*2-1);
    //print("コンストラクタ通過");
  }
  
  
  display(){
    image(banana_img, this.banana_x, this.banana_y, this.banana_size, this.banana_size);
  }
  
  
  move(){
    //上からバナナが移動してくる
    if((0<this.banana_y) && (this.banana_y-10<height)){
      this.banana_y += 1;  
      
      //バナナ_xの初期位置からランダム値分の割合でずらしていく
      this.banana_x = width/2 + ((this.banana_y - this.banana_init_y) * this.fallen_banana_rate);
      //バナナのサイズを大きくしていく
      this.banana_size =  this.banana_init_size + (this.banana_y - this.banana_init_y) * this.banana_size_rate;
      
    }else{
      this.banana_y = -1000; 
    }
    
    /*
    if(this.banana_y-10<height)
      print(this.banana_x, this.banana_y);
    */
  }
  
  //踏まれた場合の処理
  Stepped_on(){
    this.banana_y = -1000;
  }
  
  //バナナの位置とサイズを取得
  Banana_info(){
    let banana_info = new Array(3);
    banana_info[0] = this.banana_x;
    banana_info[1] = this.banana_y;
    banana_info[2] = this.banana_size;
    
    return banana_info;
  }
}