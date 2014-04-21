/*!
 * FastGap v0.0.49 (http://fastgap.mobi/)
 * Author: Gustavo Costa
 * Maintainers: https://github.com/orgs/FastGap/members
 * Copyright (c) 2014
 * Licensed under MIT
 */

/* FASTGAP https://github.com/FastGap/FastGap 

;(function(window,undefined){
	"use strict";

	// Localise Globals
	//var History = window.History = window.history||{};

	/*History.bind = function(event, callback){
		//window.addEventListener(event, callback);
	};

})(window);*/
/* FASTGAP https://github.com/GustavoCostaW/FastGap */


(function (window) {
	// FastGap object
	var FG = window.FG = {
		scrollApp: null,
		currentController: null,
		$contentLoad: null,
		$menu: null,
		$content: null,
		$headerApp: null,
	};
	//init project
	FG.init = function () {
		FG.setDomElements();
		this.addEventListeners();
		this.definitions();
		/* PHONEGAP EVENT DEVICE READY LOAD HOME PAGE */

		//document.addEventListener("deviceready",function(){
		//prevent bug call transitionend
		setTimeout(function () {
			Transition.control = true;
			Navigator.loadPage('home.html','HomeController');
		}, 10);
		//});
	};
	//set fg elements
	FG.setDomElements = function () {
		FG.$contentLoad = $("#scroll");
		FG.$menu = $("#menu");
		FG.$content = $("#content");
		FG.$headerApp = $('#header-app');
		FG.$scrollApp = document.getElementById("scroll");
	}
	//set definitions project
	FG.definitions = function () {
		//fastclick, performance library of mouse events to touch events
		FastClick.attach(document.body);


		/*block drag "navegator box", this code locks the drag in the browser 			but it locks the scroll, BlackBerry and Android is not necessary, 			and to avoid this in iOS add the following code in config.xml 

		<preference name = "DisallowOverscroll" value = "true" />
		
		
		$(document).on('touchmove', function (event) {
			e.preventDefault();
		});*/
	}
	//set fastgap listeners
	FG.addEventListeners = function () {
		//orientation change event
		window.addEventListener("orientationchange", function () {
			//scroll - CSS CALC() NOT WORKS IN ANDROID < 4.3 AND IOS 6.0 < 
			$("#scroll").height(window.innerHeight - FG.$headerApp.height());
		}, false);

		//load internal pages
		$("#page").on('click', '.botoes-app', Navigator.loadPage);

		//listener menu button
		$("#page").on('click', "#menu-button", Transition.toggleMenu);

		//SNAP JS
		snapper = new Snap({
			element: document.getElementById('content'), //your content
			maxPosition: $("menu").width(), //width of the menu
			disable: 'right', //disable right menu
			transitionSpeed: 0.2 //speed transition
		});

		//scroll - CSS CALC() NOT WORKS IN ANDROID < 4.3 AND IOS 6.0 < 
		$("#scroll").height(window.innerHeight - FG.$headerApp.height());

	};
})(window);
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
/* FASTGAP https://github.com/FastGap/FastGap */

(function (window) {

    // page load object
    var PageLoad = window.PageLoad = {
        ajxHandle: null
    };

    //load ajax 
    PageLoad.load = function (page) {
        PageLoad.ajxHandle = $.get("pages/" + page, PageLoad.success);
    };
    //sucess load
    PageLoad.success = function (content) {

        if (FG.currentController != null) {
            // unset everything in the previous controller
            // prevent memory leaks
            FG.currentController.destroy();
        }


        FG.$contentLoad.html(content);

        //create new controller
        FG.currentController = new this[Navigator.controlers]();

        // once new controller created, initialize it
        if (FG.currentController != null) {
            FG.currentController.initialize();
        }

        //hide my menu
        Transition.hideMenu();
        //remove transition in my app
        Transition.control = true;
        FG.$contentLoad.removeClass(Transition.class);
    };


})(window);
/* FASTGAP https://github.com/GustavoCostaW/FastGap */


/* GLOBAL VAR */
var app;
/* SNAP JS*/
var snapper;
/*FIRST REQUEST APP*/
var firstrequestapp = true;

//ready app
$(document).ready(function () {
	//create the project
	FG.init();
	app = new AppController();
	app.initialize();
});