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
 * Load page module
 * @module FG.PageLoader
 * @author Gustavo Costa <https://github.com/GustavoCostaW>
 * @author Bruno Ziiê <http://github.com/brunoziie/>
 */
(function(FG) {
	var PageLoader = {};

	/**
	 * Ajax handler
	 * @type {Object}
	 */
	PageLoader.ajaxHandle = null;

	/**
	 * Get page content
	 * @param  {String}   page     Page name without extension
	 * @param  {Function} callback Success callback
	 * @return {void}
	 */
	PageLoader.load = function(page, callback) {
		PageLoader.ajaxHandle = $.get('pages/' + page + '.html', callback || PageLoader.success);
	};

	/**
	 * Default success callback if none defined
	 * @param  {Mixed} content Request content returned
	 * @return {void}
	 */
	PageLoader.success = function (content) {
		// nothing to do here
	};

	// Exports
	FG.PageLoader = PageLoader;
})(FG);