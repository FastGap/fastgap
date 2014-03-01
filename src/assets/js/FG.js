/* FASTGAP https://github.com/GustavoCostaW/FastGap */
(function(window) {
    // FastGap object
    var FG = window.FG = {
        scrollApp: null,
        scrollMenu:null,
        currentController:null,
        first: true,
        $contentLoad:null,
        $menu: null,
        $content: null,
        $headerApp: null,
    };
    //init project
    FG.init = function() {
        FG.setDomElements();
        this.addEventListeners();
        this.definitions();
        /* PHONEGAP EVENT DEVICE READY LOAD HOME PAGE */
        //document.addEventListener("deviceready",function(){
            Navigator.loadPage('home.html');
        //});
    };
    //set fg elements
    FG.setDomElements = function() {
        FG.$contentLoad = $("#load-content-here");
        FG.$menu = $("#menu");
        FG.$content = $("#content");
        FG.$headerApp = $('#header-app');
    }
    //set definitions project
    FG.definitions = function() {
        //fastclick, performance library of mouse events to touch events
        FastClick.attach(document.body);
        //block drag "navegator box"
        $(document).on('touchmove', function(event) {
            event.preventDefault();
        });
    };
    //set fastgap listeners
    FG.addEventListeners = function() {
    	//load internal pages
        $("#page").on('click', '.botoes-app', Navigator.loadPage);
        //listener end transition
        FG.$content.on("webkitTransitionEnd transitionend MSTransitionEnd", Transition.End);
        //listener menu button
        $("#page").on('click', "#menu-button", Transition.toggleMenu);
        //listener swipe events
        Hammer(document).on("swipeleft", Transition.toggleMenu);
        Hammer(document).on("swiperight", Transition.toggleMenu);
        
        //scroll
        $("#iscroll").height(window.innerHeight - FG.$headerApp.height());
        $("#menu-content").height(window.innerHeight);
        
        FG.scrollApp = new IScroll("#iscroll", {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            fadeScrollbars:true
        });
        
        FG.scrollMenu = new IScroll("#menu-content", {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            fadeScrollbars:true
        });
        
        //history # listener
        /*History.bind('popstate', function() {
            if (FG.first) {
                FG.first = false;
                return;
            }
            Navigator.currentPage = location.href
                    .split('/').pop();

            if (Navigator.currentPage.indexOf('.html') < 0) {
                return false;
            }

            Navigator.isBack = true;

            Transition.control = true;
            Transition.class = Transition.getClassAnimation(Navigator.currentPage);
            Transition.start();
        });*/
    };
})(window);