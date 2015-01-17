function Controller() {
  this.cid = '';
  this.width = 800;
  this.height = 600;

  this.init = function(cid, width, height) {
    this.cid = cid;
    this.width = width;
    this.height = height;
  }

  this.start = function() {
    var canvas = document.getElementById(this.cid);
    var ctx = canvas.getContext('2d');
  }
}
