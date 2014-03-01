/* FASTGAP https://github.com/GustavoCostaW/FastGap */

(function(window) {

    // page load object
    var PageLoad = window.PageLoad = {
        ajxHandle: null
    };

    //load ajax 
    PageLoad.load = function(page) {
        PageLoad.ajxHandle = $.get("pages/" + page, PageLoad.success);
    };
    //sucess load
    PageLoad.success = function(content) {

        if (FG.currentController != null) {
            // unset everything in the previous controller
            // prevent memory leaks
            FG.currentController.destroy();
        }

        // add content in #page
        FG.$contentLoad.html(content);

        // create new controller
        switch (Navigator.currentPage) {
            case 'home.html':
                FG.currentController = new HomeController();
                break;
            case 'page1.html':
                FG.currentController = new Page1Controller();
                break;
            case 'page2.html':
                FG.currentController = new Page2Controller();
                break;
            case 'page3.html':
                FG.currentController = new Page3Controller();
                break;
            case 'page4.html':
                FG.currentController = new Page4Controller();
                break;
            case 'page5.html':
                FG.currentController = new Page5Controller();
                break;
            default:
                alert('No controller found.');
                break;
        }

        // once new controller created, initialize it
        if (FG.currentController != null) {
            FG.currentController.initialize();
        }

        FG.scrollApp.refresh();
        Transition.hideMenu();
        FG.$content.removeClass(Transition.class);
    };


})(window);