var ViewController = function(){};
ViewController.prototype = {
     initialize:function(){
         // set events
         console.log('ViewController initialized. Override this method in your class.');
     },
     destroy: function(){
         // unset events
         console.log('ViewController destroyed. Override this method in your class.');
     }
};