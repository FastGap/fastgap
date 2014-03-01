var AppController = function(){};

AppController.prototype = {
     initialize:function(){
     
     },
     destroy: function(){
         // unset events
         // stop ajax
         // destroy components
         PageLoad.ajxHandle = null;
     }
};