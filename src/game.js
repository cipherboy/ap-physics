function Controller() {
  this.cid = '';
  this.sid = '';
  this.width = 1600;
  this.height = 1200;
  this.force = {};
  this.framebuffer = [];
  this.elements = [];
  this.bindHandler = function() {};
  this.unbindHandler = function() {};

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

  this.start = function() {
    this.bindEvents();
    this.static();
    this.draw();
  };
  
  this.draw = function() {
  };
    
  this.static = function() {
    var canvas = document.getElementById(this.sid);
    var ctx = canvas.getContext('2d');
    var frame = '';
    for (var eid in this.elements) {
      frame += this.elements[eid].frame() + ',';
    }
    jCanvasDraw(canvas, ctx, frame);
  };
  
  this.bindEvents = function() {
    this.unbindEvents();
    $(document).on('keypress', { instance: this }, function(event) {
      if (event.which >= 37 && event.which <= 40) {
        /**
         * 0 - 37 - Left
         * 1 - 38 - Up
         * 2 - 39 - Right
         * 3 - 40 - Down
        **/
      }
    });
    this.bindHandler();
  };
  
  this.unbindEvents = function() {
    this.unbindHandler();
  };
}
