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
    var net = 0;
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
    [this.force['magnitude'], this.force['direction']] = this.sumForces([this.force['magnitude'], this.force['direction']], [0.1, directions[direction]]);
    this.force['magnitude'] = Math.min(this.force['magnitude'], this.force['scale']);
    this.force['last'] = current;
  };
  
  /**
   * TODO: Fix - think about it. 
  **/
  this.iterate = function() {
    var current = new Date().getTime();
    this.bounce();
    if (this.last != 0) {
      var position = this.splitForces(this.force['magnitude'], this.force['direction']);
      position[0] *= Math.pow((current-this.last)/10, 2);
      position[1] *= Math.pow((current-this.last)/10, 2);
      
      this.center[0] += position[0];
      this.center[1] += position[1];
    }
    
    this.last = current;
  };
  
  /**
   * Given: a[magnitude, direction], b[magnitude, direction]
   * Returns sum of two vectors
  **/
  this.sumForces = function(a, b) {
    a = this.splitForces(a[0], a[1]);
    b = this.splitForces(b[0], b[1]);
    
    return this.joinForces(a[0]+b[0], a[1]+b[1]);
  };
  
  /**
   * Given: magnitude, direction
   * Returns [x,y] components of vector
  **/
  this.splitForces = function(magnitude, direction) {
    return [magnitude*Math.cos(direction), magnitude*Math.sin(direction)];
  };
  
  /**
   * Given: x,y components of vector
   * Returns [magnitude, direction]
  **/
  this.joinForces = function(x, y) {
    var magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var direction = Math.atan2(y, x);
    
    return [magnitude, direction];
  };
  
  /**
  * Figures out if the object is at the wall and if it is, deflects it at the same angle to normal (only direction changes)
  **/
  this.bounce = function() {
    if (this.center[1] - this.radius <= 0) {
      var x = 0;
      var y = 0;
      [x, y] = this.splitForces(this.force['magnitude'], this.force['direction']); 
      y = Math.abs(y);
      [this.force['magnitude'], this.force['direction']] = this.joinForces(x, y);
    } else if (this.center[1] + this.radius >= 1200) {
      var x = 0;
      var y = 0;
      [x, y] = this.splitForces(this.force['magnitude'], this.force['direction']); 
      y = -1*Math.abs(y);
      [this.force['magnitude'], this.force['direction']] = this.joinForces(x, y);
    }
      
    if (this.center[0] - this.radius <= 0) {
      var x = 0;
      var y = 0;
      [x, y] = this.splitForces(this.force['magnitude'], this.force['direction']); 
      x = Math.abs(x);
      [this.force['magnitude'], this.force['direction']] = this.joinForces(x, y);
    } else if (this.center[0] + this.radius >= 1600) {
      var x = 0;
      var y = 0;
      [x, y] = this.splitForces(this.force['magnitude'], this.force['direction']); 
      x = -1*Math.abs(x);
      [this.force['magnitude'], this.force['direction']] = this.joinForces(x, y);
    }
  };
};