/* FASTGAP https://github.com/GustavoCostaW/FastGap */

(function (window) {
	//navigator object
	var Navigator = window.Navigator = {
		control: true,
		currentPage: '',
		controlers:'',
		isBack: false
	};
	//load page*****************modifiquei ****************
	Navigator.loadPage = function (url, Dcontrolers) {
		//if string page is url
		if (typeof url == "string") {
			Navigator.currentPage = url;
			Navigator.controlers=Dcontrolers;
		} else {
			// or page is data-url attr in menu ul li element
			Navigator.currentPage = $(this).data("url");
			Navigator.controlers=$(this).data("controler");
			
		}
		
		//start transition
		Transition.start();
	};


})(window);