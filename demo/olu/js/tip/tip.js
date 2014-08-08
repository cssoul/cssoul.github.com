/**
 * auto：百草
 * tip组件
 */
(function(factoray) {
	'use strict';

	if (typeof define === "function" && define.amd) {
		defind(["zepto"], factoray);
	} else {
		factoray(window.Zepto);
	}
}(
	function($) {

		var _timer = null;
		
		function Tip(text, timeout) {
			return new Tip.fn.ready(text,timeout);
		};

		Tip.fn = Tip.prototype = {

			ready: function(text, timeout) {
				var self = this;
				self.text = text;
				self.timeout = timeout;
				self.init();
			},
			//初始化
			init: function() {
				var tips = $('<div id="tips_wrap" style="display:none">' + this.text + '</div>');

				if ($('#tips_wrap').length <= 0) {
					$('body').append(tips);
				} else {
					$('#tips_wrap').html(this.text);
				}
				this.tips = $('#tips_wrap');
			},
			show: function() {
				this.tips.fadeIn().css('top', $(window).scrollTop() + $(window).height() / 2 - $('#tips_wrap').height());
				this.tips.trigger("show");
				this.hide();
			},
			hide: function() {
				//自动消失
				var self = this;
				clearTimeout(_timer);
				_timer = setTimeout(function() {
					self.tips.fadeOut();
					self.tips.trigger("hide");
				}, this.timeout || 2000);
			},
			on: function() {
				var type = arguments[0],
					fun = arguments[1];
				if (typeof type == "string" && typeof fun == "function") {
					this.tips.on(type, fun, arguments[2]);
				}
			}
		};

 	Tip.fn.ready.prototype = Tip.prototype;
		olu.tip = Tip;

		return olu.tip;
	}
));