//
//  _____         _    ____             
// |  ___|_ _ ___| |_ / ___| __ _ _ __  
// | |_ / _` / __| __| |  _ / _` | '_ \ 
// |  _| (_| \__ \ |_| |_| | (_| | |_) |
// |_|  \__,_|___/\__|\____|\__,_| .__/ 
//                               |_|
//                               
// https://github.com/FastGap/fastgap

(function(window) {
	var Page3Controller;

	// Create a new controller extending the FG.Controller superclass
	Page3Controller = FG.extend(FG.Controller, {
		transition: 'rotate-x',

		initialize: function () {
			// ...
		},

		destroy: function () {
			// ...
		}
	});

	// Exports
	FG.controllers.Page3Controller = Page3Controller;
})(window);