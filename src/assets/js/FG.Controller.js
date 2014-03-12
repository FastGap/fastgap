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
 * Controller Superclass. 
 * This class will be used like a basic implementation that all controllers must to be
 * @module FG.Controller
 * @author Bruno Ziiê <http://github.com/brunoziie/>
 */

(function(FG) {
	var Controller;

	Controller = {
		/**
		 * Transition used by controller
		 */
		transition: 'fade',

		/**
		 * Init controller's settings 
		 * @return {void}
		 */
		initialize: function () {

		},

		/**
		 * Destroy controller's resources
		 * @return {void}
		 */
		destroy: function () {

		},

		onTransitionEnd: function (direction) {

		}
	};

	// Exports
	FG.Controller = Controller;
})(FG);