/**
* Creates plate objects to draw and calculate forces from it
**/

function Plates()
{
    this.length = 0;
    this.charge = 0;
    this.color = '#000';
    
    /**
    * Generic initialization function
    **/
    
    this.init = function(obj)
    {
        for(place in obj)
        {
            if(place && place in this)
            {
                this[place] = obj[place];
            }
        }
    };
    
    /**
    * Return drawn frame.
    **/
    
    this.frame = function()
    {
    };
    
    /**
    * Given object, return electric field acting on object
    **/
    
    /** 
    * Equations: 
    * E = Q/ EA (E = 8.85 x 10^-12)
    * W = Eqr
    **/ 
    
    this.field = function(object)
    {
        var perm = 8.85E-12;
        return object.charge / [object.length * object.length * perm];
    };
};