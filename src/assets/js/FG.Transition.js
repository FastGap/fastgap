// 
//   _____         _    ____             
// |  ___|_ _ ___| |_ / ___| __ _ _ __  
// | |_ / _` / __| __| |  _ / _` | '_ \ 
// |  _| (_| \__ \ |_| |_| | (_| | |_) |
// |_|  \__,_|___/\__|\____|\__,_| .__/ 
//                               |_|
//                               
// https://github.com/FastGap/fastgap

/**
 * This module is responsible for handling the transitions between controllers
 * @module FG.Transition
 * @author Gustavo Costa <https://github.com/GustavoCostaW>
 * @author Bruno Ziiê <http://github.com/brunoziie/>
 */
(function(FG) {
    var Transition = {};

    // Constants
    Transition.IN = true;
	Transition.OUT = false;
    
    /**
     * Direction of transition (Transition.IN or Transition.OUT). 
     * When "Transition.IN" means that transtion class was applied. 
     * When "Transition.OUT" transtion class was removed or overrided.
     * @type {boolean}
     */
    Transition.direction = Transition.IN;

    /**
     * Current transition class name
     * @type {String}
     */
    Transition.current = null;

    /**
     * Start current controller page transition
     * @return {void}
     */
    Transition.start = function () {
        var transition = FG.currentController.transition;

        Transition.direction = Transition.IN;
        Transition.current = transition;

        FG.$content.addClass(transition);
    };

    /**
     * Remove current transition class
     * @return {void}
     */
    Transition.clean = function () {
        FG.$content.removeClass(FG.currentController.transition);
    };

    /**
     * TransitionEnd event callback
     * @return {void}
     */
    Transition.onStop = function (event) {
        FG.Router.onTransitionEnd(event, Transition.direction);
        Transition.direction = (Transition.direction == Transition.IN) ? Transition.OUT : Transition.IN;
    };

    // Exports
    FG.Transition = Transition;
})(FG);