class Timer{
  constructor(time){
    //何秒ごとに生成するか
    this.totalTime = time;
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