/**
 * Creates barmagnet objects to draw and calculate forces from it
**/
function Barmagnet() {
  this.length = 0;
  this.center = [0, 0];
  this.angle = 0;
  this.radius = 0;
  this.strength = 0;
  this.width = 0;
  this.colors = ['#000', '#000'];

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
    var boxes = [
      [
        [this.center[0] - this.length/2, this.center[1] - this.radius],
        [this.center[0] + this.length/2, this.center[1] - this.radius],
        [this.center[0] + this.length/2, this.center[1] - this.width/2],
        [this.center[0] - this.length/2, this.center[1] - this.width/2],
      ]
      ,
      [
        [this.center[0] - this.length/2, this.center[1] + this.width/2],
        [this.center[0] + this.length/2, this.center[1] + this.width/2],
        [this.center[0] + this.length/2, this.center[1] + this.radius],
        [this.center[0] - this.length/2, this.center[1] + this.radius],
      ]
    ];
    var frame = '';
    for (var boxid in boxes) {
      console.log(this.colors[boxid]);
      frame += 'b,ss:' + this.colors[boxid] + ',fs:' + this.colors[boxid] + ',sa,';
      var start = this.rotate(boxes[boxid][3], this.angle); 
      frame += 'm:' + start[0] + ':' + start[1] + ',';
      for (var pid = 0; pid < 5; pid ++) {
        var points = this.rotate(boxes[boxid][pid % 4], this.angle);
        frame += 'l:' + points[0] + ':' + points[1] + ',';
      };
      frame += ',w:' + this.width + ',s,f,re,c,';
    };
    console.log(frame);
    return frame;
  };

  /** 
   * Given object,
   * Return magnetic field acting on object.
  **/
  this.force = function(charge, location) {
    // http://dmr-physicsnotes.blogspot.com/2013/01/magnetic-field-strength-at-point-due-to.html
    var corners = this.bounds();
    if (location[0] > corners[0][0] && location[0] < corners[1][0]) { 
      return [this.strength, this.angle - (Math.PI/2)];
    } else {
      return [0, 0];
    }
  };

  /**
   * Given object,
   * Return shortest distance from corners to object.
   * 
   * Checks all brefore returning. 
  **/
  this.distance = function(object) {
    var shortest = 9E+9;
    var corners = this.bounds();
    for (var loc in corners) {
      var corner = corners[loc];
      var distance = Math.sqrt(Math.pow(corner[0] - object.center[0], 2) + Math.pow(corner[1] - object.center[1], 2));
      if (distance < shortest) {
        shortest = distance;
      }
    }
    
    return shortest;
  };

  /** 
   * Given object,
   * Return true if contains; else false.
   *
   * Left, Right, Top, Bottom checking (best case: left of object. worst case: below object)
  **/
  this.contains = function(object) {
    var bounds = this.bounds();
    var left = ( bounds[0][1] - bounds[3][1] ) / ( bounds[0][0] - bounds[3][1] );
    var right = ( bounds[1][1] - bounds[2][1] ) / ( bounds[1][0] - bounds[2][1] );
    var top = ( bounds[1][1] - bounds[0][1] ) / ( bounds[1][0] - bounds[0][1] );
    var bottom = ( bounds[2][1] - bounds[3][1] ) / ( bounds[2][0] - bounds[3][1] );
    
    if ( left * (object.center[0] - bounds[0][0]) < object.center[1] - bounds[0][1]) {
      return false;
    } else if ( right * (object.center[0] - bounds[1][0]) > object.center[1] - bounds[1][1]) {
      return false;
    } else if ( top * (object.center[0] - bounds[0][0]) < object.center[1] - bounds[0][1]) {
      return false;
    } else if ( bottom * (object.center[0] - bounds[2][0]) > object.center[1] - bounds[2][1]) {
      return false;
    }
    
    return true;
  };

  /**
   * Return bounds of object according to the following chart.
   * 
   *     l
   *     ^
   *  l/2 l/2
   * 0-------1
   * |       | r
   * |   c   |   } 2r
   * |       | r
   * 3-------2
  **/
  this.bounds = function() {
    return [
      this.rotate([this.center[0] - this.length/2, this.center[1] - this.radius], this.angle),
      this.rotate([this.center[0] + this.length/2, this.center[1] - this.radius], this.angle),
      this.rotate([this.center[0] + this.length/2, this.center[1] + this.radius], this.angle),
      this.rotate([this.center[0] - this.length/2, this.center[1] + this.radius], this.angle),
    ];
  };

  /**
   * Given [x, y] and angle,
   * Return rotation about origin.
   *
   * Note: if center != origin, add after return.
  **/
  this.rotate = function(points, angle) {
    var x = points[0] - this.center[0]; 
    var y = points[1] - this.center[1];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [ x*cos + y*sin + this.center[0], -x*sin + y*cos + this.center[1] ];
  };
};