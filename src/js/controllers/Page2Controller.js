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