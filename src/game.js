function Controller() {
  this.cid = '';
  this.width = 800;
  this.height = 600;
  this.force = {};
  this.framebuffer = [];
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
    var canvas = document.getElementById(this.cid);
    var ctx = canvas.getContext('2d');
    this.bindEvents();
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
