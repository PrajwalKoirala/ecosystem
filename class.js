vehicle = function(){
  this.position = new vector(random(width),random(height));
  this.velocity = new vector(0,0);
  this.acceleration = new vector(0,0);
  this.maxspeed=random(7);
  this.maxfoodforce=random(-4,4);
  this.maxpoisonforce=random(-4,4);
  this.inithealth=random(5,100);
  this.nutrition= random(10,30);
  this.deff= random(10,30);
  this.health=this.inithealth;
}
vehicle.prototype.show = function(){
  push();
  translate(this.position.x,this.position.y);
  rotate(this.velocity.getAngle() + PI/2);
  fill(this.health);
  beginShape();
  vertex(0,0);
  vertex(-6,24);
  vertex(6,24);
  vertex(0,0);
  endShape();
  pop();

}
vehicle.prototype.seek = function(target,iffood){
  var desired = new vector();
  desired=sub(target,this.position);
  desired.setR(this.maxspeed);
  var steering = new vector();
  steering=sub(desired,this.velocity);
  if(iffood){
    steering.setR(this.maxfoodforce);
  }
 if(!iffood){
   steering.setR(this.maxpoisonforce);
  }
  this.acceleration = add(this.acceleration,steering);
  return steering;

}
vehicle.prototype.update = function(){
  this.position = add(this.position, this.velocity);
  this.velocity = add(this.velocity, this.acceleration);
  if(this.position.x>width) this.position.setX(0);
  if(this.position.x<0) this.position.setX(width);
  if(this.position.y>height) this.position.setY(0);
  if(this.position.y<0) this.position.setY(height);
  if(this.velocity.getR()> this.maxspeed) this.velocity.setR(this.maxspeed );

  this.acceleration.setR = 0;
  this.acceleration.setAngle = 0;
}


vehicle.prototype.seeknearestfood = function(list){
  var record= Infinity;
  for(let i=0;i<list.length;i++){
    let d = dist(this.position.x,this.position.y,list[i].x,list[i].y);
    if(d < record){
      record = d;
      var recordindex = i;
    }
  }
  if(list[recordindex]){
    return this.seek(list[recordindex],food.includes(list[recordindex]));
  }
}
vehicle.prototype.eatfood = function(list,iffood){
  for(each of list){
    let d = dist(this.position.x,this.position.y,each.x,each.y);
    if(d<5){
      list.splice(list.indexOf(each),1);
      if(iffood){
        this.health+=this.nutrition;
      }
      if(!iffood){
        this.health-=this.deff;
      }
    }
  }
}
vehicle.prototype.checkhealth = function(a){
  if(this.health<0){
    food.push(new vector(this.position.x,this.position.y));
    v.splice(a,1);
  }
}

function sub(a,b){
  var c = new vector(0,0);
  c.setX(a.x-b.x);
  c.setY(a.y-b.y);
  return c;
}
function add(a,b){
  var c = new vector(0,0);
  c.setX(a.x+b.x);
  c.setY(a.y+b.y);
  return c;
}
