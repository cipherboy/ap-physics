function Grounding() {
  this.length = 0;
  this.angle = 0;
  this.radius = 0;
  this.width = 0;
  this.rate = 0;
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
    var frame = 'b,ss:' + this.color + ',w:' + this.width + ",";
    var corners = this.bounds(); // + rotation
    frame += 'm:' + corners[0][0] + ':' + corners[0][1] + ',l:' + corners[1][0] + ':' + corners[1][1] + ',';
    var mark = this.width * 4;
    frame += 's,c';
    return frame;
  };

  /** 
   * Makes the field equal to 0 aka, grounds it
  **/
  this.force = function(object) {
    return [0, 0];
  };
    
  /**
   * Return bounds of object according to the following chart.
   *
   *      l
   *      ^
   *  1/2   1/2
   * 0________1
   * |        | r
   * |    c   |   } 2r
   * |        | r
   * 3--------2
  **/
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