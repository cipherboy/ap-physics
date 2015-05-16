/**
 * Given: a[magnitude, direction], b[magnitude, direction]
 * Returns sum of two vectors
**/
sumForces = function(a, b) {
  a = this.splitForces(a[0], a[1]);
  b = this.splitForces(b[0], b[1]);

  return this.joinForces(a[0]+b[0], a[1]+b[1]);
};

/**
 * Given: magnitude, direction
 * Returns [x,y] components of vector
**/
splitForces = function(magnitude, direction) {
  return [magnitude*Math.cos(direction), magnitude*Math.sin(direction)];
};

/**
 * Given: x,y components of vector
 * Returns [magnitude, direction]
**/
joinForces = function(x, y) {
  var magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var direction = Math.atan2(y, x);

  return [magnitude, direction];
};