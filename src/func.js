let banana_num = 0;
let banana_sum = 0;
let banana_num_flag = false;
let line_num = 0;
let line_sum = 0;
let line_num_flag = false;
let tree_num = 0;
let tree_sum = 0;
let tree_num_flag = false;

//obj_num->1:バナナ, 2:コイン, 3:キノコ
let obj_num = 0;  

//バナナ
function func_banana(){
  //１秒後の動作（バナナの数を増やす）
  if(banana_timer.isFinished()){
    if(Math.random() <= 0.92){
      obj_num = 1;
    }else if(Math.random() <= 0.7){
      obj_num = 2;
    }else{
      obj_num = 3;
    }
    
    banana[banana_num] = new Banana(obj_num);
    banana_num ++;
    
    if(banana_num == banana.length){
      banana_num_flag = true;
      banana_num = 0;
    }
    
    banana_timer.start();
  }
 
  //要素数が超えたか超えていないかを判断するフラグ  
  if(banana_num_flag){ 
    banana_sum = banana.length;
  }else{
    banana_sum = banana_num;
  }
  
  for(let i=0; i<banana_sum; i++) {
    banana[i].display();
    banana[i].move();

    if(step==3 && car.isHit(banana[i])){
      banana[i].Stepped_on();
    }
  }
}


//センターライン
function func_line(){
  //2秒後の動作（ラインの数を増やす）
  if(line_timer.isFinished()){
    c_line[line_num] = new CenterLine();
    line_num ++;
    
    if(line_num == c_line.length){
      line_num_flag = true;
      line_num = 0;
    }
    
    line_timer.start();
  }
 
  //要素数が超えたか超えていないかを判断するフラグ  
  if(line_num_flag){ 
    line_sum = c_line.length;
  }else{
    line_sum = line_num;
  }
  
  for(let i=0; i<line_sum; i++){
    c_line[i].display();
    c_line[i].move();
  }
}


//木
function func_tree(){
  //１秒後の動作（バナナの数を増やす）
  if(tree_timer.isFinished()){
    l_tree[tree_num] = new L_Tree();
    r_tree[tree_num] = new R_Tree(); 
    tree_num ++;
    
    if(tree_num == l_tree.length){
      tree_num_flag = true;
      tree_num = 0;
    }
    
    tree_timer.start();
  }
 
  //要素数が超えたか超えていないかを判断するフラグ  
  if(tree_num_flag){ 
    tree_sum = l_tree.length;
  }else{
    tree_sum = tree_num;
  }
  
  for(let i=tree_sum; i>0; --i){
    if(tree_sum == 0)  break;
    l_tree[i-1].display();
    r_tree[i-1].display();
    l_tree[i-1].move();
    r_tree[i-1].move();
    
  }
}


//バナナ、車などのオブジェクトをすべて消去
function deleteObj(){   
  for(let i=0; i<banana_sum; i++){
    banana[i].end();
  }
  
  for(let i=0; i<line_sum; i++){
    c_line[i].end();
  }
  
  for(let i=0; i<tree_sum; i++){
    l_tree[i].end();
    r_tree[i].end();
  }
  
  car.end();
  car = new Car();
}


//リプレイをする場合、すべての変数を初期化
function replay_conf(){
  banana_point = 0;
  banana_hit_num = 0;
  kinoko_point = 0;
  coin_point = 0;
  life = init_life;
  once = 1;
  b_time = 800;
  l_time = 800;
  t_time = 300;
  banana_timer = new Timer(b_time);
  line_timer = new Timer(l_time);
  tree_timer = new Timer(t_time);
  banana_timer.start();
  line_timer.start();
  tree_timer.start();
  now_acceleration = 0.01;
  now_l_acceleration = 0.01;
  now_t_acceleration = 0.1;
  score = 0;
  b_pre_score = 0;
  l_pre_score = 0;
  t_pre_score = 0;
  //bg_img = loadImage('assets/road4.png');  
}