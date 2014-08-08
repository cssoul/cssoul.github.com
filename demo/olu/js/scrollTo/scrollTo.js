/*
 * @require: zepto.js
 * @author: tianming
 * @create: 2014-07-18
 * @description: 页面滚动，实现缓动效果~
 */

+(function($) {
  'use strict';

  var DEFAULTS = {
    endY: 1,
    duration: 200,
    interval: 10
  };

  var interpolate = function (source, target, shift) {
    return (source + (target - source) * shift);
  };

  var easing = function (pos) {
    return (-Math.cos(pos * Math.PI) / 2) + .5;
  };

  /**
  * 
  * @class Scroll
  * @constructor
  */
  var Scroll = function(settings) {
    var options = $.extend({}, DEFAULTS, settings);

    this.options = options;
    this.goTo();
  };

  /*
   * 滚动页面
   * @endY {Int} 滚动Y轴坐标值
   * */
  Scroll.prototype.goTo = function(endY){
    if(!isNaN(endY) && endY.toString() != "") this.options.endY = endY;

    if (this.options.duration === 0) {
      window.scrollTo(0, this.options.endY);

      if (typeof self.options.callback === 'function') self.options.callback();
      return;
    }

    this.roll();
  }

  /*
   * 缓冲滚动
   * */
  Scroll.prototype.roll = function(){
    var self = this,
        _timer = null;

    var startY = window.pageYOffset,
        startT = Date.now(),
        finishT = startT + self.options.duration;

    var animate = function() {
      var now = Date.now(),
          shift = (now > finishT) ? 1 : (now - startT) / self.options.duration;

      window.scrollTo(0, interpolate(startY, self.options.endY, easing(shift)));

      if (now < finishT) {
        _timer = setTimeout(animate, self.options.interval);
      }else {
        if (typeof self.options.callback === 'function') self.options.callback();
      }
    };

    animate();
  }

  function plugin(option) {
    var data = new Scroll(option);
  }

  if (typeof define === "function" && define.amd) {
    define(function () {
        return Scroll
    });
  } else {
    $.scrollTo             = plugin
    $.scrollTo.Constructor = Scroll
  }

})(Zepto);