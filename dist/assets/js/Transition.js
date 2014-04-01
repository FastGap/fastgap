/* FASTGAP https://github.com/FastGap/FastGap */

(function (window) {

	// transition object
	var Transition = window.Transition = {
		control: false,
		class: 'transitionApp1'
		/* VIEW TRANSITIONS.CSS OR CREATE YOUR TRANSITION */
	};

	//start transition
	Transition.start = function () {
		if (!firstrequestapp) {
			FG.$contentLoad.addClass(Transition.class);
			//time for alpha 150 mileseconds
			setTimeout(Transition.End, 150);
		} else {
			//first request open app
			firstrequestapp = false;
			Transition.End();
		}
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
		if (snapper.state().state == "closed") {
			Transition.showMenu();
		} else {
			Transition.hideMenu();
		}
	};
	//hide panel menu
	Transition.hideMenu = function () {
		snapper.close();
	};
	//show panel menu
	Transition.showMenu = function () {
		snapper.open('left');
	};

})(window);