/**
 * Creates solenoid objects to draw and calculate forces from it
**/
function Solenoid() {
  this.length = 0;
  this.coils = 0;
  this.center = [0, 0];
  this.angle = 0;
  this.radius = 0;
  this.current = 0;
  this.width = 0;
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
   * Return drawn frame.
   * Notes: Cycloid circle has radius smaller than drawing arm creating loops.
   *        Quantity of loops unrelated to coil count; starts from bound[0].
  **/
  this.frame = function() {
    var frame = 'b,sa,ss:' + this.color + ',sa,';
    var corner = this.bounds()[0];
    var working = this.radius/4;
    var increment = working/100;
    var end = this.length/working + ((this.length/working) % (2*Math.PI));
    //frame += 'm:' + corner[0] + ':' + corner[1] + ',';
    for (var t = increment; t < end; t += increment) {
      frame += 'l:' + (corner[0] + (working * t) - (this.radius * Math.sin(t))) + ':' + (corner[1] + working - (this.radius * Math.cos(t))) + ',';
    }
    frame += 'r:' + this.angle + ',w:' + this.width + ',s,re,c';
    return frame;
  };

  /** 
   * Given object,
   * Return magnetic field acting on object.
  **/
  this.field = function(object) {
    if (this.contains(object)) {
      return [4 * Math.PI * 1E-7 * object.charge * this.coils/this.length * this.current, this.angle];
    } else {
      return [4 * Math.PI * 1E-7 * object.charge * this.coils/this.length * this.current / Math.pow(this.distance(object), 2), this.angle];
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
   *     2l
   *     ^
   *   l   l
   * 0-------1
   * |       | r
   * |   c   |   } 2r
   * |       | r
   * 3-------2
  **/
  this.bounds = function() {
    var transform = [
      this.rotate([-1*this.length, this.radius], this.angle),
      this.rotate([this.length, this.radius], this.angle),
      this.rotate([this.length, -1 * this.radius], this.angle),
      this.rotate([-1*this.length, -1*this.radius], this.angle),
    ];
    
    return [
      [this.center[0] + transform[0][0], this.center[1] + transform[0][1]],
      [this.center[0] + transform[1][0], this.center[1] + transform[1][1]],
      [this.center[0] + transform[2][0], this.center[1] + transform[2][1]],
      [this.center[0] + transform[3][0], this.center[1] + transform[3][1]]
    ];
  };

  /**
   * Given [x, y] and angle,
   * Return rotation about origin.
   *
   * Note: if center != origin, add after return.
  **/
  this.rotate = function(points, angle) {
    var radius = Math.sqrt(Math.pow(points[0], 2), Math.pow(points[1], 2));
    var start = Math.atan(points[1] / points[0]);
    return [ radius * Math.cos(start + angle) , radius*Math.sin(start + angle) ];
  };
};