// 
//  _____         _    ____             
// |  ___|_ _ ___| |_ / ___| __ _ _ __  
// | |_ / _` / __| __| |  _ / _` | '_ \ 
// |  _| (_| \__ \ |_| |_| | (_| | |_) |
// |_|  \__,_|___/\__|\____|\__,_| .__/ 
//                               |_|
//                               
// https://github.com/FastGap/fastgap

/**
 * Application boot module
 * @module FG.Bootstrap
 * @author Gustavo Costa <https://github.com/GustavoCostaW>
 * @author Bruno Ziiê <http://github.com/brunoziie/>
 */
(function (FG) {
	var Bootstrap = {};

	/**
	 * Bootup the project
	 * @return {void}
	 */
	Bootstrap.init = function() {
		// Set environment
		this.setDomElements();
		this.addEventListeners();
		this.definitions();

		// Do the magical
		FG.Router.parse();
	};

	/**
	 * Define DOM Elements variables
	 * @return void
	 */
	Bootstrap.setDomElements = function() {
		FG.$contentLoad = $('#load-content-here');
		FG.$menu = $('#menu');
		FG.$content = $('#content');
		FG.$header = $('#header-app');
		FG.$stage = $('#stage');
	}

	/**
	 * set definitions project
	 * @return {void}
	 */
	Bootstrap.definitions = function() {
		//fastclick, performance library of mouse events to touch events
		FastClick.attach(document.body);

		//block drag 'navegator box'
		$(document).on('touchmove', function(event) {
			event.preventDefault();
		});
	};

	/**
	 * Set FastGap listeners
	 * @return {void}
	 */
	Bootstrap.addEventListeners = function() {
		//load internal pages
		$('#page').on('click', '.caller', FG.Router.parse);

		//listener end transition
		FG.$content.on('webkitTransitionEnd transitionend MSTransitionEnd', FG.Transition.onStop);

		//listener menu button
		$('#page').on('click', '#menu-button', FG.Menu.toggle);

		//listener swipe events
		//Hammer(document).on('swipeleft', FG.Menu.hide);
		//Hammer(document).on('swiperight', FG.Menu.show);
		
		//scroll
		$('#iscroll').height(window.innerHeight - FG.$header.height());
		$('#menu-content').height(window.innerHeight);
		
		FG.scrollApp = new IScroll('#iscroll', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			fadeScrollbars: true
		});
		
		FG.scrollMenu = new IScroll('#menu-content', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			fadeScrollbars: true
		});
	};

	// Exports
	FG.Bootstrap = Bootstrap;
})(FG);