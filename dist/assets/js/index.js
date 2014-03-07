/* FASTGAP https://github.com/GustavoCostaW/FastGap 

IMPORTANT, READ LIBRARY DOCS FOR BETTER CUSTOMIZATION 

http://iscrolljs.com
http://zeptojs.com
http://topcoat.io


*/

/* GLOBAL VAR */
var app;

//ready app
$(document).ready(function () {
	//create the project
	FG.init();
	app = new AppController();
	app.initialize();
});