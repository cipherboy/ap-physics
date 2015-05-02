/**
 * Creates electric plates with either a + or - charge
 * calculates the force on the object
 * gives charge given to the object
**/
function Plates() {
  this.length = 0;
  this.charge = 0;
  this.force = function() { };

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
}
