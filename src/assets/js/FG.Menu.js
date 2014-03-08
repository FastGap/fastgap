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
 * This module manages menu behavior
 * @module FG.Menu
 * @author Bruno Ziiê <http://github.com/brunoziie/>
 */
(function (FG) {
	var Menu = {};

	// Constants
	Menu.CLOSED = false;
	Menu.OPENED = true,

	/**
	 * Menu status (Menu.CLOSED or Menu.OPENED)
	 * @type {boolean}
	 */
	Menu.status = Menu.CLOSED;

	/**
	 * Toggle application menu
	 * @return {void}
	 */
	Menu.toggle = function() {
		if (Menu.status === Menu.CLOSED) {
			Menu.show();
		} else {
			Menu.hide();
		}
	};

	/**
	 * Hide application menu
	 * @return {void}
	 */
	Menu.hide = function() {
		Menu.status = Menu.CLOSED;
		FG.$menu.removeClass('menu-opened');
		FG.$stage.removeClass('menu-opened');
	};

	/**
	 * Show application menu
	 * @return {[type]} [description]
	 */
	Menu.show = function() {
		Menu.status = Menu.OPENED;
		FG.$menu.addClass('menu-opened');
		FG.$stage.addClass('menu-opened');
	};
	
	// Exports
	FG.Menu = Menu;
})(FG);