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
   * Return drawn frame.
  **/
  this.frame = function() {
    var frame = 'b,sa,ss:' + this.color + ',fs:' + this.color + ',w:' + this.width + ',';
    frame += 'm:' + this.center[0] + ':' + this.center[1] + ',a:' + this.center[0] + ':' + this.center[1] + ':' + this.radius + ':0:' + Math.PI*2.5 + ',';
    frame += ',f,s,re,c';
    return frame;
  };
}