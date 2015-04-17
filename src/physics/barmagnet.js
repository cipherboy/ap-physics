/**
 * Creates barmagnet objects to draw and calculate forces from it
**/
function barmagnet() {
  this.length = 0;
  this.center = [0, 0];
  this.angle = 0;
  this.radius = 0;
  this.strength = 0;
  this.width = 0;
  this.color = '#000';
  
  /**
   * Return drawn frame.
  **/
  this.frame = function() {
    
  };

  /** 
   * Given object,
   * Return magnetic field acting on object.
  **/
  this.field = function(object) {
    // http://dmr-physicsnotes.blogspot.com/2013/01/magnetic-field-strength-at-point-due-to.html
    return this.strength;
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
      rotate([-1*this.length, r], this.angle),
      rotate([this.length, r], this.angle),
      rotate([this.length, -r], this.angle),
      rotate([-1*this.length, r], this.angle),
    ];
    
    return [
      [center[0] + transform[0][0], center[1] + transform[0][1]],
      [center[0] + transform[1][0], center[1] + transform[1][1]],
      [center[0] + transform[2][0], center[1] + transform[2][1]],
      [center[0] + transform[3][0], center[1] + transform[3][1]]
    ];
  };

  /**
   * Given [x, y] and angle,
   * Return rotation about origin.
   *
   * Note: if center != origin, add after return.
  **/
  this.rotate = function(points, angle) {
    return [ points[0] * Math.cos(angle) - points[1] * Math.sin(angle) , points[0] * Math.sin(angle) + points[1] * Math.sin(angle) ];
  };
};