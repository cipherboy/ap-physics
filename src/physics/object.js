/**
 * Creates a Player object
**/
function Player() {
  this.state = [
    ['x', 0, 0, 'x'],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ['x', 0, 0, 'x'],
  ];
  this.center = [0, 0];
  this.width = 0;
  this.radius = 0;
  this.color = '#000';
  this.last = 0;
  this.force = {
    start: null,
    last: null,
    direction: 0,
    scale: 5,
    magnitude: 0
  };
  
  /**
   * Generic initialization function
  **/
  this.init = function(obj) {
    for (place in obj) {
      if (place && place in this) {
        this[place] = obj[place];
      }
    }
  };
  
  /**
   * Return drawn frame.
  **/
  this.frame = function() {
    var frame = 'b,sa,ss:' + this.color + ',fs:' + this.color + ',w:' + this.width + ',';
    frame += 'm:' + this.center[0] + ':' + this.center[1] + ',a:' + this.center[0] + ':' + this.center[1] + ':' + this.radius + ':0:' + Math.PI*2.5 + ',';
    frame += ',f,s,re,c';
    return frame;
  };
  
  /**
   * Returns net charge of object from summing this.state
  **/
  this.charge = function() {
    var net = 1;
    for (var y in this.state) {
      for (var x in this.state[y]) {
        if (this.state[y][x] != 'x') {
          net += this.state[y][x];
        }
      }
    }
    
    return net;
  };
  
  /**
   * Increases force applied based upon time up to max force. 
   * No return; since constant mass, force equaling acceleration;
   * Leaves mass as second factor for difficulty level. 
  **/
  this.applyForce = function(direction) {
    var current = new Date().getTime();
    var magnitude = 0.3;
    var directions = [
      Math.PI,
      -Math.PI/2,
      0,
      Math.PI/2
    ];
    [this.force['magnitude'], this.force['direction']] = sumForces([this.force['magnitude'], this.force['direction']], [0.1, directions[direction]]);
    this.force['magnitude'] = Math.min(this.force['magnitude'], this.force['scale']);
    this.force['last'] = current;
  };
  
  /**
   * TODO: Fix - think about it. 
  **/
  this.iterate = function(external) {
    var current = new Date().getTime();
    var force = sumForces([this.force['magnitude'], this.force['direction']], external);
    this.bounce();
    if (this.last != 0) {
      var position = splitForces(force[0], force[1]);
      position[0] *= Math.pow(1000/600, 2);
      position[1] *= Math.pow(1000/600, 2);
      
      this.center[0] += position[0];
      this.center[1] += position[1];
    }
    
    this.last = current;
  };
  
  /**
  * Figures out if the object is at the wall and if it is, deflects it at the same angle to normal (only direction changes)
  **/
  this.bounce = function(boundsx, boundsy) {
    if (this.center[1] - this.radius <= 0) {
      var x = 0;
      var y = 0;
      [x, y] = splitForces(this.force['magnitude'], this.force['direction']); 
      y = Math.abs(y);
      [this.force['magnitude'], this.force['direction']] = joinForces(x, y);
    } else if (this.center[1] + this.radius >= 1200) {
      var x = 0;
      var y = 0;
      [x, y] = splitForces(this.force['magnitude'], this.force['direction']); 
      y = -1*Math.abs(y);
      [this.force['magnitude'], this.force['direction']] = joinForces(x, y);
    }
      
    if (this.center[0] - this.radius <= 0) {
      var x = 0;
      var y = 0;
      [x, y] = splitForces(this.force['magnitude'], this.force['direction']); 
      x = Math.abs(x);
      [this.force['magnitude'], this.force['direction']] = joinForces(x, y);
    } else if (this.center[0] + this.radius >= 1600) {
      var x = 0;
      var y = 0;
      [x, y] = splitForces(this.force['magnitude'], this.force['direction']); 
      x = -1*Math.abs(x);
      [this.force['magnitude'], this.force['direction']] = joinForces(x, y);
    }
  };
};