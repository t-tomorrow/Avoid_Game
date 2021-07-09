class Timer{
  constructor(){
    //何秒ごとにバナナを生成するか
    this.totalTime = 1000;    //１秒ごと
  }
  
  start(){
    this.savedTime = Date.now();
  }
  
  isFinished(){
    this.passedTime = Date.now() - this.savedTime;
    
    if(this.passedTime > this.totalTime){
      return true;
    }else{
      return false;
    }
  }
}