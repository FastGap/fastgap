/* FASTGAP https://github.com/GustavoCostaW/FastGap */

(function (window) {
	//navigator object
	var Navigator = window.Navigator = {
		control: true,
		currentPage: '',
		isBack: false
	};
	//load page
	Navigator.loadPage = function (url) {
		//if string page is url
		if (typeof url == "string") {
			Navigator.currentPage = url;
		} else {
			// or page is data-url attr in menu ul li element
			Navigator.currentPage = $(this).data("url");
		}
		//start transition
		Transition.start();
	};


})(window);