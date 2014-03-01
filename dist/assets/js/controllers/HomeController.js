var HomeController = function() {};

HomeController.prototype = {
    initialize: function() {
        //your code here
    },
    destroy: function() {
        // unset events
        // stop ajax
        // destroy components
        FG.scroll = null;
        PageLoad.ajxHandle = null;
    }
};