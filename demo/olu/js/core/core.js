/**
 * olu
 * @author tianming
 * @version 0.0.1
 */

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['Zepto', 'exports'], function($, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.olu = factory(root, exports, $);
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    factory(root, exports);

  // Finally, as a browser global.
  } else {
    root.olu = factory(root, {}, (root.Zepto || root.$));
  }

}(this, function(root, olu, $) {

  //only Number
  olu.numOnly =  function(val){
    if (val === undefined || val === "") return 0;
    if (isNaN(parseFloat(val))) {
        if (val.replace) {
            val = val.replace(/[^0-9.-]/g, "");
        } else return 0;
    }
    return parseFloat(val);
  };

  //create a psuedo UID
  olu.uuid = function() {
      var S4 = function() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  //get css3 Prefix
  olu.cssPrefix= function(){
      var cssPrefix = $.fx.cssPrefix;
      return cssPrefix.replace(/-/g, "");
  };

  //css3 Animate
  olu.css3animate = function(el, opts) {
      el = $(el);
      return el.css3Animate(opts);
  };

  return olu;

}));