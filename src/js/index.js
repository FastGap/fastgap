// FASTGAP - GUSTAVO COSTA - @GustavoCostaW


/* GLOBAL VARS */

//Scroll
var myScroll;
//current this
var currentThis;
// ajax pages
var ajxPages;

//starts app
$(document).ready(function(){

	myApp = function(){

		function init(){
			//startApp
			startApp();
		}

		function startApp(){
			// startApp in AppController.js
			new AppController().initialize();
		}
		//start init
		init();
	}

	//start 
	myApp = new myApp();

})

