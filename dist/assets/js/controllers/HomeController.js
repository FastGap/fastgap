var HomeController = function () {};

HomeController.prototype = {
	self: Object,
	initialize: function () {
		//your code here
	},
	destroy: function () {
		// unset events
		// stop ajax
		// destroy components
		FG.scroll = null;
		PageLoad.ajxHandle = null;
	}
};