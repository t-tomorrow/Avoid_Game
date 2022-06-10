let touchObjectList = new Array(10);

let touch;
let id;
let count;

function touch_screen(){

  if (touches.length != 0) {

    // 初出現のIDを探す
    touches.forEach(element => {
      let isExist = false;
      touchObjectList.forEach(object => {
        if (element.id === object.id) {
          isExist = true;
        }
      });
      if (isExist === false) {
        // 要素の追加
        touchObjectList.push(new touchObject(element));
        
        display_transition();
      }
    });
  }
  
    touchObjectList.forEach(element => {
    if (element.update() === false) {
      touchObjectList.pop(element);
    }
  });
}


// タッチした情報を格納するクラス
class touchObject{
  constructor(_touch) {
    this.touch = _touch;
    this.id = _touch.id;
    this.x = _touch.x;
    this.y = _touch.y;
    this.count = 0;
  }

  update(){
    this.count++;

    // 削除判定
    // 同じIDのtouchが存在しなければ削除
    let isExist=false;
    touches.forEach(element => {
      if (element.id === this.id) {
        this.touch = element;
        isExist = true;
      }
    });

    if(step == 3){
      pDeviceOrientation = deviceOrientation;
      car.touch_move(this.x);
    }
    
    return isExist;
  }
}


//タッチ操作された場合の動作
function display_transition(){
  if(step != 3){
    sound3.play(); 
  }
  
  switch(step){
    case 1:
      deleteObj();
      step = 2.1;
      break;
    case 2.1:
      sound1.play();
      step = Math.floor(++step);
      break;
    case 4:
      replay_conf();
      step = 1;
      break;
  }
}