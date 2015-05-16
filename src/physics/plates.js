function Plates() {
  this.length = 0;
  this.charge = 0;
  this.angle = 0;
  this.radius = 0;
  this.width = 0;
  this.center = [0, 0];
  this.color = '#000';

  /**
   * Generic initialization function
  **/
  this.init = function(obj){
    for (place in obj){
      if (place && place in this) {
        this[place] = obj[place];
      }
    }
  };

  /**
   * Return drawn frame.
  **/
  this.frame = function() {
    var frame = 'b,ss:' + this.color + ',w:' + this.width + ",";
    var corners = this.bounds(); // + rotation
    frame += 'm:' + corners[0][0] + ':' + corners[0][1] + ',l:' + corners[1][0] + ':' + corners[1][1] + ',';
    var tick_l = this.width * 4;
    for (var start = this.center[0] - this.length/2;
         start < this.center[0] + this.length/2;
         start += tick_l * 2) {
      var end = start + tick_l;
      var startv = this.rotate([start, this.center[1] + this.radius], this.angle);
      var endv = this.rotate([end, this.center[1] + this.radius], this.angle);
      frame += 'm:' + startv[0] + ':' + startv[1] + ',l:' + endv[0] + ':' + endv[1] + ',';
    }
    if (this.charge > 0) {
      for (var start = this.center[0] - this.length/2;
           start < this.center[0] + this.length/2;
           start += tick_l * 2) {
        var startv = this.rotate([start+tick_l/2, this.center[1] + this.radius - tick_l/2], this.angle);
        var endv   = this.rotate([start+tick_l/2, this.center[1] + this.radius + tick_l/2], this.angle);
        frame += 'm:' + startv[0] + ':' + startv[1] + ',l:' + endv[0] + ':' + endv[1] + ',';
      }
    }
    frame += 's,c';
    return frame;
  };

  /**
   * Given object, return force due to electric field acting on object
   * Equations: 
   * F = Eq
   * E = Q/ EA (E = 8.85 x 10^-12)
   * W = Eqr
  **/
  this.force = function(charge, location) {
    var perm = 8.85E-12;
    return [charge * this.charge / ( this.length * this.radius * 1000 * 1000 * perm), this.angle - Math.PI/2];
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

  this.rotate = function(points, angle) {
    var x = points[0] - this.center[0];
    var y = points[1] - this.center[1];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [x*cos + y*sin + this.center[0], -x*sin + y*cos + this.center[1]];
  };
};
