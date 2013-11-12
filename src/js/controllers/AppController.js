/* @GUSTAVOCOSTAW FASTGAP */

var AppController = function(){};

AppController.prototype = new ViewController();

AppController.prototype = {
     initialize:function(){
     	 //start app
         this.definitions();
         this.startApp();

         currentThis = this;
     },
     definitions:function(){
            //fastclick, performance library of mouse events to touch events
            FastClick.attach(document.body);
            //block drag "navegator box"
            $(document).on('touchmove', function(event) {
                event.preventDefault();
            });
     },
     startApp:function(){
     	//first ajax
        ajxPages = $.get("pages/home.html",function(data){
            //scroll home
        	$("#page").html(data);
            $("#content").height(window.innerHeight-$("header#header-app").height());
            myScroll = new IScroll('#content',{ scrollbars: true, mouseWheel: true, interactiveScrollbars: true });
            //transitions.js
            transitions();
        });
     },
     destroy: function(){
     	//destroy app
     	console.log("destroy");
     }
};