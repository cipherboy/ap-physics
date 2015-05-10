function Grounding() {
  this.length = 0;
  this.angle = 0;
  this.radius = 0;
  this.wdith = 0;
  this.center = [0, 0];
  this.color = '#000';

  /** 
   * Generic initialiation function
  **/
  this.init = function(obj) {
    for (place in obj) {
      if (place && place in this) {
        this[place] = obj[place];
      }
    }
  };

  /**
   * Return drawn frame
  **/
  this.frame = function() {
    var frame = 'b,sa,ss:' + this.color + ',r:' + this.angle + 'w:' + this.width + ",";
    var corners = this.bounds();
    from += 'm:' + corners[0][0] + ':' + corners[0][1] + ',l:' + corners[1][1] + ',';
    frame += 's,re,c';
  };

  this.field = function(object) {
    return 0;
  };

  this.bounds = function() {
    return [
      this.rotate([this.center[0] - this.length/2, this.center[1] - this.radius], this.angle),
      this.rotate([this.center[0] + this.length/2, this.center[1] - this.radius], this.angle),
      this.rotate([this.center[0] + this.length/2, this.center[1] + this.radius], this.angle),
      this.rotate([this.center[0] - this.length/2, this.center[1] + this.radius], this.angle),
    ];
  };

  this.rotate = function(points, angle) {
    var x = points[0] - this.center[0];
    var y = points[1] - this.center[1];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [x*cos + y*sin + this.center[0], -x*sin + y*cos + this.center[1]];
  };
};