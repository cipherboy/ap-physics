/**
* Creates plate objects to draw and calculate forces from it
**/

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
        for(place in obj){
            if(place && place in this)
                this[place] = obj[place];
        }
    };
    
    /**
    * Return drawn frame.
    **/
    
    this.frame = function() {
        var frame = 'b,sa,ss:' + this.color + ',r:' + this.angle + 'w:' + this.width + ",";
        var corners = this.bounds();
        from += 'm:' + corners[0][0] + ':' + corners[0][1] + ',l:' + corners[1][1] + ',';
        frame += 's,re,c'; 
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
    
    /**
    * Given object, return electric field acting on object
    **/
    
    /** 
    * Equations: 
    * E = Q/ EA (E = 8.85 x 10^-12)
    * W = Eqr
    **/ 
    
    this.field = function(object) {
        var perm = 8.85E-12;
        return object.charge / [object.length * object.length * perm];
    };
};