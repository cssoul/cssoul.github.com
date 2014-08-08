/**
 * @弹出层
 * @author 天明<tianming@mogujie.com>
 * @module confirm
 **/

;(function ($,MFL) { 
  'use strict';

  var _default = {
    wrap: '.mod_confirm',
    type: 'confirm',
    tip: '弹窗',
    onConfirm: function () {},
    onCancel: function(){},
    confirmText: '确定',
    cancelText: '取消'
  }

  /**
  * 
  * @class Confirm
  * @constructor
  */
  MFL.Confirm = function(cfg) {
    var self = this;

    self.cfg = $.extend({}, _default, cfg);

    self.init();
  }

  MFL.Confirm.prototype = {
    //初始化
    init : function () {

      this.buildDom();

      this.bindEvent();
    },

    // 获得弹窗内部的dom字符串
    getDomStr : function () {
      var self = this , 
          type = self.cfg['type'], 
          tip = self.cfg['tip'] , 
          wrap = self.cfg['wrap'].replace('.' , '');

      var arr = [
      	'<div class="mod_confirm ' + (wrap === 'mod_confirm' ? '' : wrap) + '" style="visibility: hidden;">',
      		'<div class="mask"></div>',
      		'<div class="box">',
      			'<div class="content">' + tip + '</div>',
      			'<div class="action">' + (type === 'confirm' ? ' <span class="btn btn_cancel">' + self.cfg['cancelText'] + '</span>' : '') + '<span class="btn btn_confirm">' + self.cfg['confirmText'] + '</span></div>',
      		'</div>',
      	'</div>'
      ];

      return arr.join('');
    },

    // 构建dom结构
    buildDom : function () {
      var domStr = this.getDomStr();
      var confirmBox = $(domStr);
      
      this.confirmBox = confirmBox;
      $('body').append(confirmBox);
      this.maskZoom();
      this.calcPos();

      return this;
    },

    // 确定弹窗的位置（margin值）
    calcPos : function () {
    	var box = this.confirmBox.find('.box');	
    	var size = box.height();
    	var scrolltop = document.body.scrollTop;
    	var viewSize = window.innerHeight;

    	box.css('margin-top' , (scrolltop + (viewSize - size ) /2)  + 'px');
    	this.confirmBox.css('visibility' , 'visible');
      
    	return this;
    },

    // 初始化蒙层的边界(高度)
    maskZoom : function () {
    	var viewSize = window.innerHeight , bodySize = document.body.offsetHeight;
    	var mask = this.confirmBox.find('.mask');

    	if (viewSize >= bodySize) {
    		mask.css('height' , viewSize + 'px');	
    	} else {
    		mask.css('height' , bodySize + 'px');	
    	}

    	return this;
    },

    // 代理事件
    bindEvent : function () {
      var self = this;
      var box = this.confirmBox;

      box.on('click' , '.btn_cancel' , function (e) {
        var res1 = self.cfg['onCancel']();
        if ((res1 !== false)) {
          self.destroy();
        }
      }).on('click' , '.btn_confirm' , function (e) {
        var res1 = self.cfg['onConfirm']();
        if ((res1 !== false)) {
          self.destroy();
        }
      }).on('touchstart' , '.btn' , function (e) {
        $(e.currentTarget).addClass('press');
      }).on('touchend' , '.btn' , function (e) {
        $(e.currentTarget).removeClass('press');
      });
      $(window).on('scroll',function(){
          return false;
      });
    },

    // 销毁弹窗
    destroy : function () {
      var self = this,
          _time = null;
      
      self.confirmBox.fadeOut(200);

      _time = setTimeout(function(){
        self.confirmBox.remove();
        self = null;
      },400);
    }
	}

})( window.jQuery || window.Zepto,window.MFL || (window.MFL={}));

