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
 * This module defines which controller is invoked by page
 * @module FG.Router
 * @author Bruno Ziiê <http://github.com/brunoziie/>
 */
(function (FG) {
	var Router = {};

	/**
	 * Controller called when init app
	 * @type {String}
	 */
	Router.root = 'home';

	/**
	 * Routes definition.
	 * When key is the page name and value is the controller used
	 * @type {Object}
	 */
	Router.routes = {};

	/**
	 * Page request data
	 * This object is used Router when transitions ends
	 * @type {Object}
	 */
	Router.request = {
		path: null,
		caller: null
	};

	/**
	 * Parses which is page's controller and then call it
	 * @param  {String}     path   Route name
	 * @param  {DOMElement} caller Element caller of page (optional)
	 * @return {void}
	 */
	Router.parse = function (path, caller) {
		var controller, 
			requestPath, 
			requestCaller = caller || null;

		if (typeof path === 'object') {
			requestCaller = path.target;
			requestPath = requestCaller.dataset.path;
		} else {
			requestPath = path || Router.root;
		}

		controller = Router.getController(requestPath);

		if (controller !== null) {
			if (FG.currentController !== null) {
				FG.currentController.destroy();
			}

			FG.currentController = new controller();
			
			Router.request.caller = requestCaller;
			Router.request.path = requestPath;

			FG.Menu.hide();
			FG.Transition.start();
		} else {
			throw new Error('Controller not found');
		}
	};

	/**
	 * Get controller from a route
	 * @param  {String}   path Route name
	 * @return {Function} Controller's constructor
	 */
	Router.getController = function (path) {
		var name, controller;

		if (typeof Router.routes[path] !== 'undefined') {
			return Router.routes[path];
		}

		name = Router.getControllerName(path);

		if (typeof FG.controllers[name] !== 'undefined') {
			controller = FG.controllers[name];
			Router.routes[path] = controller;
			return controller;
		}

		return null;
	};

	/**
	 * Format controller name
	 * Ex:
	 * Router.getControllerName('home')          >>> HomeController
	 * Router.getControllerName('composed_name') >>> ComposedNameController
	 * 
	 * @param  {String} path Page name
	 * @return {String}      Controller name
	 */
	Router.getControllerName = function (path) {
		return path.replace(/^([a-z])|_([a-z])/g, function ($1) {
			return $1.toUpperCase();
		}).replace(/\s/, '') + 'Controller';
	}

	/**
	 * Initialize controller
	 * @param  {DOMElement} caller Element call of page
	 * @return {[type]}        [description]
	 */
	Router.initController = function (caller) {
		if (FG.currentController !== null) {
			FG.currentController.initialize(caller);
		}

		FG.scrollApp.refresh();
		FG.Transition.clean();
	}

	/**
	 * TransitionEnd event handler
	 * @param  {Object}  event     Event data
	 * @param  {Boolean} direction Transition's direction (Transition.IN or Transition.OUT)
	 * @return {void}
	 */
	Router.onTransitionEnd = function (event, direction) {
		var path = Router.request.path,
			caller = Router.request.caller;

		if (direction === FG.Transition.IN) {
			FG.PageLoader.load(path, function (content) {
				FG.$contentLoad.html(content);
				Router.initController(caller);
				FG.PageLoader.ajaxHandle = null;
			});
		}
	};

	/**
	 * Clean stored request data
	 * @return {void}
	 */
	Router.cleanRequestData = function () {
		Router.request = {
			path: null,
			caller: null
		};
	};

	// Exports
	FG.Router = Router;
})(FG);