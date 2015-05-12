function Controller() {
  this.cid = '';
  this.sid = '';
  this.lid = '';
  this.width = 1600;
  this.height = 1200;
  this.force = {};
  this.framebuffer = [];
  this.elements = [];
  this.player = null;
  this.bindHandler = function() {};
  this.unbindHandler = function() {};
  this.running = true;

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
    this.main(this);
  };
  
  this.main = function(instance) {
    var start = new Date().getTime();
    instance.player.iterate();
    this.draw();
    if (instance.running) {
      var end = new Date().getTime();
      setTimeout(function() {
        instance.main(instance);
      }, ((1000/60) - (end - start))); 
    }
  };
  
  this.draw = function() {
    var canvas = document.getElementById(this.cid);
    var ctx = canvas.getContext('2d');
    jCanvasDraw(canvas, ctx, "cs");
    jCanvasDraw(canvas, ctx, this.player.frame());
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
  
  this.eventHandleMovement = function(direction) {
    this.player.applyForce(direction);
  };
  
  this.bindEvents = function() {
    this.unbindEvents();
    $(document).on('keydown', { instance: this }, function(event) {
      if (event.which >= 37 && event.which <= 40) {
        /**
         * 0 - 37 - Left
         * 1 - 38 - Up
         * 2 - 39 - Right
         * 3 - 40 - Down
        **/
        event.data.instance.eventHandleMovement(event.which - 37);
      }
    });
    this.bindHandler();
  };
  
  this.unbindEvents = function() {
    this.unbindHandler();
  };
  
  this.log = function() {
    
  };
}
