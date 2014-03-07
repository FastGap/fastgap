/* FASTGAP https://github.com/GustavoCostaW/FastGap */

(function(window) {
    //navigator object
    var Navigator = window.Navigator = {
        control: true,
        currentPage: '',
        isBack: false
    };
    //load page
    Navigator.loadPage = function(url) {
        Transition.control = true;
        if(typeof url == "string") {
            Navigator.currentPage = url;
        }
        else {
            Navigator.currentPage = $(this).data("url");
        }
        
        Transition.class = Transition.getClassAnimation(Navigator.currentPage);
        Transition.start();
    };


})(window);