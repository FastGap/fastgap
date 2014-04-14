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