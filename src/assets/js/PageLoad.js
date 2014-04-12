/* FASTGAP https://github.com/FastGap/FastGap */

(function (window) {

	// page load object
	var PageLoad = window.PageLoad = {
		ajxHandle: null
	};

	//load ajax 
	PageLoad.load = function (page) {
		PageLoad.ajxHandle = $.get("pages/" + page, PageLoad.success);
	};
	//sucess load
	PageLoad.success = function (content) {

		if (FG.currentController != null) {
			// unset everything in the previous controller
			// prevent memory leaks
			FG.currentController.destroy();
		}
		
		
		
		
		

//******************modificacao para chamar os controlers****************//		
		FG.$contentLoad.html(content);
		FG.currentController = new this[Navigator.controlers]();		



//*****************************cancelado abaixo*****************************************//			
		
		
		
		//alert(content);
		/* // add content in #page
		create new controller
		switch (Navigator.currentPage) {
		case 'home.html':
			FG.currentController = new HomeController();
			break;
		case 'page1.html':
			FG.currentController = new Page1Controller();
			break;
		case 'page2.html':
			FG.currentController = new Page2Controller();
			break;
		case 'page3.html':
			FG.currentController = new Page3Controller();
			break;
		case 'page4.html':
			FG.currentController = new Page4Controller();
			break;
		case 'page5.html':
			FG.currentController = new Page5Controller();
			break;
		default:
			alert('No controller found.');
			break;
		}
		*/

		// once new controller created, initialize it
		if (FG.currentController != null) {
			FG.currentController.initialize();
		}

		//hide my menu
		Transition.hideMenu();
		//remove transition in my app
		Transition.control = true;
		FG.$contentLoad.removeClass(Transition.class);
	};


})(window);