/*!
 * FastGap v0.0.49 (http://fastgap.mobi/)
 * Author: Gustavo Costa
 * Maintainers: https://github.com/orgs/FastGap/members
 * Copyright (c) 2014
 * Licensed under MIT
 */

/* FASTGAP https://github.com/FastGap/FastGap 

IMPORTANT, READ LIBRARY DOCS FOR BETTER CUSTOMIZATION 

http://zeptojs.com
http://topcoat.io
*/


var AppController = function () {};

AppController.prototype = {
	initialize: function () {

		//YOUR "GLOBAL CODE" HERE.


	},
	destroy: function () {
		PageLoad.ajxHandle = null;
	}
};
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
var Page1Controller = function () {};

Page1Controller.prototype = {
	onScroll: Function,
	self: Object,
	initialize: function () {
		self = this;
		//scroll listener
		FG.$scrollApp.addEventListener("scroll", self.onScroll);
	},
	onScroll: function (e) {
		//checkscrol

		//the calc
		if (Number(FG.$scrollApp.scrollHeight - e.srcElement.scrollTop) - e.srcElement.clientHeight <= 350) {
			div = document.createElement("div");
			//fake content
			div.innerHTML = "<div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div><div class='page-item'><p>Hey, vamos testar a performance do Cordova?!? :-)</p></div>";
			//preload
			preload = document.createElement("div");
			preload.innerHTML = "<div class='page-item'><p>simulando requisição server...</p></div>";
			//add preload
			FG.$scrollApp.appendChild(preload);
			//remove listener on scroll
			FG.$scrollApp.removeEventListener("scroll", self.onScroll);

			/* SIMULATE DELAY 2 SECONDS FROM TO SERVER AJAX REQUEST */
			setTimeout(function () {
				//add listener
				FG.$scrollApp.addEventListener("scroll", self.onScroll);
				//remove child and add content
				FG.$scrollApp.removeChild(preload);
				FG.$scrollApp.appendChild(div);

				FG.$scrollApp.scrollTop += 20;
			}, 2000);

		}
	},
	destroy: function () {
		// unset events
		// stop ajax
		//remove listener scroll
		FG.$scrollApp.removeEventListener("scroll", self.onScroll);
		PageLoad.ajxHandle = null;
	}
};
var Page2Controller = function() {};

Page2Controller.prototype = {
    initialize: function() {
        alert("initialize Page2 Controller, create elements");
    },
    destroy: function() {
        alert("destroy Page2 Controller, destroy elements, scroll and ajax");

        PageLoad.ajxHandle = null;
    }
};
var Page3Controller = function() {};

Page3Controller.prototype = {
    initialize: function() {

    },
    destroy: function() {
        // unset events
        // stop ajax
        // destroy components
        PageLoad.ajxHandle = null;
    }
};
var Page4Controller = function() {};

Page4Controller.prototype = {
    initialize: function() {

    },
    destroy: function() {
        // unset events
        // stop ajax
        // destroy components
        PageLoad.ajxHandle = null;
    }
};
var Page5Controller = function() {};

Page5Controller.prototype = {
    initialize: function() {

    },
    destroy: function() {
        // unset events
        // stop ajax
        // destroy components
        PageLoad.ajxHandle = null;
    }
};