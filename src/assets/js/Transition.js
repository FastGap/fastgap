/* FASTGAP https://github.com/FastGap/FastGap */

(function (window) {

	// transition object
	var Transition = window.Transition = {
		control: false,
		class: 'transitionApp1'
	};

	/* effects, for select one effect, create or view effects in transitions.css */
	Transition.animations = {
		'page1.html': 'transitionApp1',
		'page2.html': 'transitionApp2',
		'page3.html': 'transitionApp3',
		'page4.html': 'transitionApp4',
		'page5.html': 'transitionApp5'
	}
	//get current class for page
	Transition.getClassAnimation = function (page) {
		if (Transition.animations.hasOwnProperty(page)) {
			return Transition.animations[page];
		}
		return Transition.class;
	}

	//start transition
	Transition.start = function () {
		FG.$content.addClass(Transition.class);
	};
	//end transition with listener
	Transition.End = function () {
		if (Transition.control) {
			PageLoad.load(Navigator.currentPage);
			//control load pages
			Transition.control = false;
		}
	};
	//toggleMenu
	Transition.toggleMenu = function () {
		if (!FG.$menu.hasClass("transitionMenuAppStart")) {
			Transition.showMenu();
		} else {
			Transition.hideMenu();
		}
	};
	//hide panel menu
	Transition.hideMenu = function () {
		FG.$menu.removeClass("transitionMenuAppStart");
		FG.$content.removeClass("transitionContentAppStart");
		FG.$headerApp.removeClass("transitionContentAppStart");
	};
	//show panel menu
	Transition.showMenu = function () {
		FG.$menu.addClass("transitionMenuAppStart");
		FG.$content.addClass("transitionContentAppStart");
		FG.$headerApp.addClass("transitionContentAppStart");
	};

})(window);