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