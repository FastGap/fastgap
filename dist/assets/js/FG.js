/* FASTGAP https://github.com/GustavoCostaW/FastGap 

IMPORTANT, READ LIBRARY DOCS FOR BETTER CUSTOMIZATION 

http://iscrolljs.com
http://zeptojs.com
http://topcoat.io


*/

(function (window) {
	// FastGap object
	var FG = window.FG = {
		scrollApp: null,
		scrollMenu: null,
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
		Navigator.loadPage('home.html');
		//});
	};
	//set fg elements
	FG.setDomElements = function () {
		FG.$contentLoad = $("#load-content-here");
		FG.$menu = $("#menu");
		FG.$content = $("#content");
		FG.$headerApp = $('#header-app');
	}
	//set definitions project
	FG.definitions = function () {
		//fastclick, performance library of mouse events to touch events
		FastClick.attach(document.body);
		//block drag "navegator box"
		$(document).on('touchmove', function (event) {
			event.preventDefault();
		});
	};
	//set fastgap listeners
	FG.addEventListeners = function () {
		//load internal pages
		$("#page").on('click', '.botoes-app', Navigator.loadPage);
		//listener end transition
		FG.$content.on("webkitTransitionEnd transitionend MSTransitionEnd", Transition.End);
		//listener menu button
		$("#page").on('click', "#menu-button", Transition.toggleMenu);

		//scroll
		$("#iscroll").height(window.innerHeight - FG.$headerApp.height());
		$("#menu-content").height(window.innerHeight);

		FG.scrollApp = new IScroll("#iscroll", {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			/* Enable fade in scroll set true, but not work and bug Scroll in Android 2.3
			,fadeScrollbars: true
			*/
		});

		FG.scrollMenu = new IScroll("#menu-content", {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true
			/* Enable fade in scroll set true, but not work and bug Scroll in Android 2.3
			,fadeScrollbars: true
			*/
		});

	};
})(window);