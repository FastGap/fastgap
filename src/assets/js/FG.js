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
 * This object is the project's namespace
 * @module FG
 */
(function(window) {
	var FG;

	FG = {
		scrollApp: null,
		scrollMenu: null,
		controllers: {},
		currentController: null,
		first: true,
		$contentLoad: null,
		$menu: null,
		$content: null,
		$header: null,
		$stage: null,
	};

	/**
	 * Implements a extends utils
	 * @param  {Mixed}    superclass Object or function that will be extended
	 * @param  {Mixed} 	  def        Object or function with override implementation
	 * @return {Function}
	 */	
	FG.extend = function(superclass, def){
		var hasProp = {}.hasOwnProperty,
			parent = function () {},
			child = (typeof def === 'function') ? new def() : def,
			extended = function () {};

		parent.prototype = (typeof superclass === 'function') ? new superclass() : superclass;
		extended.prototype = new parent();

		for (var key in child) { 
			if (hasProp.call(child, key)) {
				extended.prototype[key] = child[key];
			} 
		}

		return extended;
	};

	// Exports
	window.FG = FG;
})(window);