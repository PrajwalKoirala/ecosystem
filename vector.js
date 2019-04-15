vector = function(x,y){
  this.x=x;
  this.y=y;
}
  vector.prototype.setX = function(x){
    this.x=x;
  }
  vector.prototype.setY = function(y){
    this.y=y;
  }
  vector.prototype.setAngle =function(a){
    let length=this.getR();
    this.x=length*cos(a);
    this.y=length*sin(a);
  }
  vector.prototype.setR= function(length){
    let a=this.getAngle();
    this.x=length*cos(a);
    this.y=length*sin(a);
  }
  vector.prototype.getX= function(){
    return this.x;
  }
  vector.prototype.getY= function(){
    return this.y;
  }
  vector.prototype.getAngle= function(){
    return atan2(this.y,this.x);
  }
  vector.prototype.getR= function(){
    return sqrt(this.x*this.x+this.y*this.y);
  }
