/**
 * Creates wire objects to draw and calculate forces from it
 * ---Retired---
**/
function Wire() {
  this.length = 0;
  this.center = [0, 0];
  this.angle = 0;
  this.radius = 0;
  this.current = 0;
  this.color = '#000';
  this.width = 0;

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
    var frame = 'b,sa,ss:' + this.color + ',r:' + this.angle + 'w:' + this.width + ',';
    var corners = this.bounds();
    frame += 'm:' + corners[0][0] + ':' + corners[0][1] + ',l:' + corners[1][0] + ':' + corners[1][1] + ',';
    frame += 's,re,c';
    return frame;
  };

  /** 
   * Given object,
   * Return magnetic field acting on object.
  **/
  this.force = function(charge, location) {
    return 2E-7 * object.charge * object.charge * this.current / this.distance();
  };
  
  /**
   * Return bounds of object according to the following chart.
   * 
   *     2l
   *     ^
   *   l   l
   * 0---c---1
  **/
  this.bounds = function() {
    return
    [
      [
        this.center[0] - this.length * Math.cos(this.angle)
        ,
        this.center[1] - this.length * Math.sin(this.angle)
      ]
      ,
      [
        this.center[0] + this.length * Math.cos(this.angle)
        ,
        this.center[1] + this.length * Math.sin(this.angle)
      ]
    ];
  };
}