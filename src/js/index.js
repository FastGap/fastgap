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