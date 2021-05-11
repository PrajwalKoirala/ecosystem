var v=[];
var food=[];
var poison=[];
var initialpop = 100;
var matingpool=[];
var generation=1;
var _reproduce=true;
let paraa;
function setup(){
  paraa = createP();
  paraa.position(50,650);
  paraa2 = createP();
  paraa2.position(75,650);
  createCanvas(600,600);
  for(let i=0;i<initialpop;i++){
    v[i]=new vehicle();
  }
  for(let i=0;i<250;i++){
    poison[i] = new vector(random(width-10), random(height-10));
  }
  for(let i=0;i<200;i++){
    food[i] = new vector(random(width-10), random(height-10));
  }
}

function draw(){
  if(random(100)<10){
    food.push(new vector(random(width-10), random(height-10)));
  }
  if(random(100)<15){
    poison.push(new vector(random(width-10), random(height-10)));
  }
  background(255,255,0);
  stroke(0);
  for(let each of food){
    fill(170,255,190);
    ellipse(each.x,each.y,10);
  }
  for(let each of poison){
    fill(255,55,55);
    ellipse(each.x,each.y,10);
  }
  for(vech of v){
    vech.show();
    vech.seeknearestfood(poison);
    vech.seeknearestfood(food);
    vech.eatfood(food,true);
    vech.eatfood(poison,false);
    vech.update();
    vech.health-=1;
  }
  for(i=v.length-1; i>=0; i--){
    v[i].checkhealth(i);
  }
  if(v.length < 70/generation+28 && _reproduce){
    let p = v.length;
    addtomatingpool(v);
    reproduce();
    v.splice(0,p);
    matingpool.splice(0,matingpool.length-1);
    for(let i=0;i<20;i++){
      food.push(new vector(random(width-10), random(height-10)));
    }
    generation++;
  }
  paraa.html('Current generation # :' + generation);
  paraa2.show();
}


function addtomatingpool(list){
  for (each of list){
    for(let i=0; i<each.health;i++){
      matingpool.push(each);
    }
  }
}

function reproduce(){
  let limit= 60/generation+40;
  if(generation>60){
    limit=2;
    _reproduce=false;
  }
  for(let i=0; i<limit;i++){
    var child = new vehicle();
    let m= floor(random(matingpool.length));
    let n= floor(random(matingpool.length));
    if(random(1)<0.5){
      child.maxspeed=matingpool[m].maxspeed;
    } else{
      child.maxspeed=matingpool[n].maxspeed;
    }
    if(random(1)<0.5){
      child.maxfoodforce=matingpool[m].maxfoodforce;
    } else{
      child.maxfoodforce=matingpool[n].maxfoodforce;
    }
    if(random(1)<0.5){
      child.maxpoisonforce=matingpool[m].maxpoisonforce;

    } else{
      child.maxpoisonforce=matingpool[n].maxpoisonforce;

    }
    if(random(1)<0.5){
      child.inithealth=matingpool[m].inithealth;

    } else{
      child.inithealth=matingpool[n].inithealth;

    }
    if(random(1)<0.5){
      child.nutrition=matingpool[m].nutrition;

    } else{
      child.nutrition=matingpool[n].nutrition;

    }
    if(random(1)<0.5){
      child.deff=matingpool[m].deff;

    } else{
      child.deff=matingpool[n].deff;

    }
    if(random(100)<10){
      if(random(100)<10) child.deff=random(0,30);
      if(random(100)<10) child.nutrition= random(0,30);
      if(random(100)<10) child.inithealth= random(0,100);
      if(random(100)<10) child.maxpoisonforce= random(-4,4);
      if(random(100)<10) child.maxfoodforce= random(-4,4);
      if(random(100)<10) child.maxspeed= random(7);

    }
    v.push(child);
  }
}
