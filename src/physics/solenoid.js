function solenoid() {
  this.length = 0;
  this.coils = 0;
  this.center = [0, 0];
  this.angle = 0;
  this.radius = 0;
  this.current = 0;
  this.color = '#000';
  
  /**
   * Return frame
  **/
  this.frame = function() {
      var length = 540;
      var radius = 25;
      var rt = radius/4;
      var sx = 100;
      var sy = 100;
      var t1 = new Date();
      var i = rt/100;
      var path = 'cs,cw,b,ss:#000,w:5,m:100:' + (100 - radius + rt) + ',';
      var end = length/rt + ((length/rt) % (2*Math.PI));
      for (var t = i; t < end; t += i) {
        path += 'l:' + (sx + (rt * t) - (radius * Math.sin(t))) + ':' + (sy + rt - (radius * Math.cos(t))) + ',';
      }
      path += ',s,c,b,m:100:' + (100 + radius*2) + ',l:' + (100 + length) + ':' + (100 + radius*2) + ',ss:#000,w:5,s,c';
      var canvas = document.getElementById('simulator');
      var ctx = canvas.getContext('2d');
      jCanvasDraw(canvas, ctx, path);
      var t2 = new Date();
      console.log("inc [" + i + "]: " + (t2 - t1));
    var frame = 'b,sa,ss:' + this.color + ',';
    frame += 'sa,';
    frame += ',s,re,c';
    return frame;
  };

  /** 
   * Given object
   * Return force on object
  **/
  this.force = function(object) 
    if (this.contains(object)) {
      return [4 * Math.PI object.charge * object.getSpeed() * this.coils/this.length * this.current, this.angle];
    } else {
      return [4 * Math.PI object.charge * object.getSpeed() * this.coils/this.length * this.current / Math.pow(this.distance(object), 2), this.angle];
    }
  };

  /** 
   * Given object
   * Return true if contains || false
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
   * Return rotation about origin
   *
   * Note: if center != origin, add after
  **/
  this.rotate = function(points, angle) {
    return [ points[0] * Math.cos(angle) - points[1] * Math.sin(angle) , points[0] * Math.sin(angle) + points[1] * Math.sin(angle) ];
  };
};