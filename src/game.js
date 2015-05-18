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
    instance.player.iterate(instance.findForces());
    this.draw();
    this.checkEnd();
    if (instance.running) {
      var end = new Date().getTime();
      setTimeout(function() {
        instance.main(instance);
      }, ((1000/60) - (end - start))); 
    }
  };
  
  this.findForces = function() {
    console.log("=====Find Forces @ " + new Date().getTime() + "=====");
    var charge = this.player.charge();
    var center = this.player.center;
    var net = [0, 0];
    for (var eid in this.elements) {
      var element = this.elements[eid];
      var force = element.force(charge, center);
      net = sumForces(net, force);
      console.log("Force " + eid + ": " + force);
    }
    console.log("Net: " + net);
    console.log("=====End Forces=====");
    return net;
  };
  
  this.checkEnd = function() {
    if (this.player.center[0] + this.player.radius > 1225 && this.player.center[0] - this.player.radius < 1375 && this.player.center[1] + this.player.radius > 475 && this.player.center[1] - this.player.radius < 625) {
      this.running = false;
      $('body').append('<h1>Game over! :)</h1>');
      $('canvas').hide();
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
    frame += "b,fs:#000000,ss:#000000,w:0,m:,a:1300:550:75:0:" + Math.PI*2 + ",f,";
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
      } else if (event.which == 90) {
        event.data.instance.player.force.magnitude = 0;
        event.data.instance.player.force.direction = 0;
      } else if (event.which == 83) {
        event.data.instance.running = false;
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
