let init_flag = true;

function gyro_sensor(){
  let startPos;
  let horizontalPos;
  
  if (pDeviceOrientation !== undefined && pDeviceOrientation !== deviceOrientation) {
    // 向きが変わったとき
    noCanvas();
    createCanvas(windowWidth, windowHeight);
    
    if(width > height){
      s_side = height;
      s_len = 523;
    }else{
      s_side = width;
      s_len = 764;
    }
    
    startPos= new p5.Vector(0, 0);
    horizontalPos = new p5.Vector(10, 0);    
  }
  pDeviceOrientation = deviceOrientation;
  
  // ジャイロセンサの値を元に線の位置を指定する
  startPos= new p5.Vector(0, 0);
  let endPos = new p5.Vector(rotationY / 90 * width, -rotationX / 90 * height);
  horizontalPos = new p5.Vector(10, 0);
  
  let horizontalVector = createVector(horizontalPos.x - startPos.x, horizontalPos.y - startPos.y);
  let gyroVector = createVector(endPos.x - startPos.x, endPos.y - startPos.y);
  
  let handle_arg = horizontalVector.dot(gyroVector) / (mag(horizontalVector.x, horizontalVector.y) * mag(gyroVector.x, gyroVector.y));
  
  //print(handle_arg);
  
  car.handle_move(handle_arg);
}