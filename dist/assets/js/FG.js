/* FASTGAP https://github.com/GustavoCostaW/FastGap */


(function (window) {
	// FastGap object
	var FG = window.FG = {
		scrollApp: null,
		currentController: null,
		$contentLoad: null,
		$menu: null,
		$content: null,
		$headerApp: null,
	};
	//init project
	FG.init = function () {
		FG.setDomElements();
		this.addEventListeners();
		this.definitions();
		/* PHONEGAP EVENT DEVICE READY LOAD HOME PAGE */

		//document.addEventListener("deviceready",function(){
		//prevent bug call transitionend
		setTimeout(function () {
			Transition.control = true;
			Navigator.loadPage('home.html');
		}, 10);
		//});
	};
	//set fg elements
	FG.setDomElements = function () {
		FG.$contentLoad = $("#scroll");
		FG.$menu = $("#menu");
		FG.$content = $("#content");
		FG.$headerApp = $('#header-app');
		FG.$scrollApp = document.getElementById("scroll");
	}
	//set definitions project
	FG.definitions = function () {
		//fastclick, performance library of mouse events to touch events
		FastClick.attach(document.body);


		/*block drag "navegator box", this code locks the drag in the browser 			but it locks the scroll, BlackBerry and Android is not necessary, 			and to avoid this in iOS add the following code in config.xml 

		<preference name = "DisallowOverscroll" value = "true" />
		
		
		$(document).on('touchmove', function (event) {
			e.preventDefault();
		});*/
	}
	//set fastgap listeners
	FG.addEventListeners = function () {
		//orientation change event
		//window.addEventListener("orientationchange", function () {
			//scroll - CSS CALC() NOT WORKS IN ANDROID < 4.3 AND IOS 6.0 < 
		//	$("#scroll").height(window.innerHeight - FG.$headerApp.height());
		//}, false);

		//load internal pages
		$("#page").on('click', '.botoes-app', Navigator.loadPage);

		//listener menu button
		$("#page").on('click', "#menu-button", Transition.toggleMenu);

		//SNAP JS
		snapper = new Snap({
			element: document.getElementById('content'), //your content
			maxPosition: $("menu").width(), //width of the menu
			disable: 'right', //disable right menu
			transitionSpeed: 0.2 //speed transition
		});

		//scroll - CSS CALC() NOT WORKS IN ANDROID < 4.3 AND IOS 6.0 < 
		//$("#scroll").height(window.innerHeight - FG.$headerApp.height());

	};
})(window);
