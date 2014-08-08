/*
 * @require: zepto.js
 * @author: tianming
 * @create: 2014-07-18
 * @description: 图片懒加载，按需加载可视区内的图片~
 */

+(function($) {
  'use strict';

  var DEFAULTS = {
    threshold: 300,
    container: window,
    urlName: 'data-original',
    placeHolder: '',
    innerScroll: false,
    isVertical: true
  };

  /**
  * 
  * @class lazyload
  * @constructor
  */
  var Lazyload = function(element, options) {
    var opts = $.extend({}, DEFAULTS, options);

    this.$viewPort = $(opts.container);
    this.isVertical = opts.isVertical;
    this.isWindow = $.isWindow(this.$viewPort.get(0));
    this.OFFSET = {
            win: [this.isVertical ? 'scrollY' : 'scrollX', this.isVertical ? 'innerHeight' : 'innerWidth'],
            img: [this.isVertical ? 'top' : 'left', this.isVertical ? 'height' : 'width']
        };
    this.$plsHolder = $(opts.placeHolder).length ? $(opts.placeHolder) : null;
    this.isImg = $(element).is('img');

    !this.isWindow && (this.OFFSET['win'] = this.OFFSET['img']);   //若container不是window，则OFFSET中取值同img

    this.pedding = [];

    this.opts = opts;

    this._addPlsHolder();     //初化时将placeHolder存入
    this._detect();

    !opts.innerScroll && $(window).on(opts.eventName + ' ortchange', function () {    //涓嶆槸鍐呮粴鏃讹紝鍦╳indow涓婄粦瀹氫簨浠�
        _detect();
    });
  };

  /*
   * 图片出现在可视区的条件
   * @offset {obj} 图片偏移量
   * */
  Lazyload.prototype.isInViewport = function(offset) {
    var self = this;

    var viewOffset = self.isWindow ? window : self.$viewPort.offset(),
        viewTop = viewOffset[OFFSET.win[0]],
        viewHeight = viewOffset[OFFSET.win[1]];

    return viewTop >= offset[self.OFFSET.img[0]] - self.opts.threshold - viewHeight && viewTop <= offset[self.OFFSET.img[0]] + offset[self.OFFSET.img[1]];
  }

  /*
   * 增加图片
   * */
  Lazyload.prototype._append = function() {
    var self = this;
    self.pedding = Array.prototype.slice.call($(self.pedding.reverse()).add(this), 0).reverse();    //更新pedding值，用于在页面追加图片
    
    if ($.isFunction($.fn.lazyload.detect)) {    //若是增加图片，则处理placeHolder
        self._addPlsHolder();
        return this;
    };
  }

  /*
   * 加载图片，并派生事件
   * @div {string} 容器
   * */
  Lazyload.prototype._load = function(div) {
    var self = this;
    var $div = $(div),
        attrObj = {},
        $img = $div;

    if (!self.isImg) {
        $.each($div.get(0).attributes, function () {   //若不是img作为容器，则将属性名中含有data-的均增加到图片上
            ~this.name.indexOf('data-') && (attrObj[this.name] = this.value);
        });
        $img = $('<img />').attr(attrObj);
    }
    $div.trigger('startload');
    $img.on('load',function () {
        !self.isImg && $div.replaceWith($img);     //若不是img，则将原来的容器替换，若是img，则直接将src替换
        $div.trigger('loadcomplete');
        $div.removeClass("lazy").removeAttr('data-original');

        $img.off('load');
    }).on('error',function () {     //图片加载失败处理
        var errorEvent = $.Event('error');       //派生错误处理的事件
        $div.trigger(errorEvent);
        errorEvent.defaultPrevented || self.pedding.push(div);
        $img.off('error').remove();
    }).attr('src', $div.attr(self.opts.urlName));
  }

  /*
   * 检测图片是否出现在可视区，并对满足条件的开始加载
   * */
  Lazyload.prototype._detect = function() {
    var self = this;
    var i, $image, offset, div,
        splice = Array.prototype.splice;

    for (i = self.pedding.length; i--;) {
        $image = $(div = self.pedding[i]);
        offset = $image.offset();
        
        self.isInViewport(offset) 
          && (splice.call(self.pedding, i, 1), self._load(div));
    }
  }

  /*
   * 若是不是img，则直接append
   * */
  Lazyload.prototype._addPlsHolder = function() {
      !this.isImg && this.$plsHolder && $(this.pedding).append(this.$plsHolder);
  }

  function plugin(option) {
    return this.each(function () {
      var $this   = $(this);

      var data = new Lazyload(this, option);
    })
  }

  if (typeof define === "function" && define.amd) {
    define(function () {
        return Lazyload
    });
  } else {
    $.fn.imgLazyload             = plugin
    $.fn.imgLazyload.Constructor = Lazyload
  }

})(Zepto);