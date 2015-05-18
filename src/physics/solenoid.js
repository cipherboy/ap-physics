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
    var frame = 'b,ss:' + this.color + ',sa,'
    var corner = [this.center[0] - this.length/2, this.center[1] - this.radius];
    var working = this.radius/6;
    var increment = working/50;
    for (var t = increment; t < this.length/working; t += increment) {
      var points = this.rotate([((corner[0]) + (working * t) - (this.radius * Math.sin(t))), ((corner[1] + this.radius) - (this.radius * Math.cos(t)))], this.angle);
      frame += 'l:' + points[0] + ':' + points[1] + ',';
    }
    frame += ',w:' + this.width + ',s,re,c,';
    return frame;
  };

  /** 
   * Given object,
   * Return magnetic field acting on object.
  **/
  this.force = function(charge, location) {
    if (this.contains(location)) {
      if (this.angle > 0) { 
        return [100*4 * Math.PI * 1E-7 * charge * this.coils/(this.length/1000 * this.current), this.angle - (Math.PI/4)];
      }
      else {
         return [100*4 * Math.PI * 1E-7 * charge * this.coils/(this.length/1000 * this.current), this.angle + (Math.PI/2)];
      }
    }
    else {
      return [0, 0];
      //return [4 * Math.PI * 1E-7 * charge * this.coils/(this.length/1000 * this.current * Math.pow(this.distance(location), 2)), this.angle];
    }
  };

  /**
   * Given object,
   * Return shortest distance from corners to object.
   * 
   * Checks all brefore returning. 
  **/
  this.distance = function(location) {
    var shortest = 9E+9;
    var corners = this.bounds();
    for (var loc in corners) {
      var corner = corners[loc];
      var distance = Math.sqrt(Math.pow(corner[0] - location[0], 2) + Math.pow(corner[1] - location[1], 2));
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
  this.contains = function(location) {
    var bounds = this.bounds();
    // 0,3 short
    var slope = ( bounds[0][1] - bounds[3][1] ) / ( bounds[0][0] - bounds[3][0] );
    var intercept = bounds[0][1] - slope*bounds[0][0];
    if ( (Math.abs(slope*location[0] - location[1] + intercept) / Math.sqrt(slope*slope + 1)) > this.length ) {
      console.log(false);
      return false;
    }
    
    // 1,0 long
    var slope = ( bounds[1][1] - bounds[0][1] ) / ( bounds[1][0] - bounds[0][0] );
    var intercept = bounds[1][1] - slope*bounds[1][0];
    if ( (Math.abs(slope*location[0] - location[1] + intercept) / Math.sqrt(slope*slope + 1)) > this.radius*2 ) {
      return false;
    }
    
    // 2,1 short
    var slope = ( bounds[2][1] - bounds[1][1] ) / ( bounds[2][0] - bounds[1][0] );
    var intercept = bounds[2][1] - slope*bounds[2][0];
    if ( (Math.abs(slope*location[0] - location[1] + intercept) / Math.sqrt(slope*slope + 1)) > this.length ) {
      return false;
    }
    
    // 3,2 short
    var slope = ( bounds[3][1] - bounds[2][1] ) / ( bounds[3][0] - bounds[2][0] );
    var intercept = bounds[3][1] - slope*bounds[3][0];
    if ( (Math.abs(slope*location[0] - location[1] + intercept) / Math.sqrt(slope*slope + 1)) > this.radius * 2 ) {
      return false;
    }
    
    console.log(true);
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