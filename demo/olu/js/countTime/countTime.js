/*
   auto:baicao
   //倒计时组件
*/
(function(factoray) {
	if (typeof define === "function" && define.amd) {
		defind(["zepto"], factoray);
	} else {
		factoray(window.Zepto);
	}
}(
	function($) {
		var manageCounterTimer = {};
		function setTime(time) {
			var oday = time / 1000 / 60 / 60 / 24;
			this.day = Math.floor(oday);
			var ohour = (oday - this.day) * 24;
			this.hour = Math.floor(ohour);
			var ominute = (ohour - this.hour) * 60;
			this.minute = Math.floor(ominute);
			var osecond = (ominute - this.minute) * 60;
			this.second = Math.floor(osecond);
			this.msecond = Math.ceil((osecond - this.second) * 10);
			this.timer = '';
		}
		function countTime(selector,config) {

			return new countTime.fn.init(selector,config);
		}

		countTime.fn = countTime.prototype = {
			init: function(selector,config) {
				// 保存已经创建受管理的实例，防止一个页面中的计时器，
				// 因为切换页面后者其他ajax操作带来的重复实例化
				var defaultOptions = {
						"showDay": false, //倒计时是否展示天
						"showMicro": false, //倒计时是否展示十分之一秒
						"showType": 0, //默认使用文字显示时间单位，可以支持冒号
						"time": 0
					},
					container, option;

				if (typeof arguments[0] == "object") {
					option = arguments[0];
				} else {
					container = arguments[0];
					option = arguments[1];
				}

				this.options = $.extend(defaultOptions, option || {});
				this.ct = container;
				this.container = $(container);

				if (this.container.length < 0) {
					console.log("参数错误");
					return;
				}
				//判断如果该元素存在于manageCounterTimer，那么就不再创建计时器了
				if (!manageCounterTimer.hasOwnProperty(this.ct)) {
					manageCounterTimer[this.ct] = this;
				} else {
					return manageCounterTimer[this.ct];
				}
				this.time = this.options.time;
				setTime.call(this, this.time);
				this.interval = this.options.showMicro ? 100 : 1000; //根据是否要展示十分之一秒来决定间隔时间
			},
			calculate: function() {
				if ((this.options.showMicro) && (this.msecond > 0)) {
					this.msecond = this.msecond - 1;
					this.renderCounter();
					if ((this.msecond == 0) && (this.second == 0) && (this.minute == 0) && (this.hour == 0) && (this.day == 0)) {
						clearInterval(this.timer);
						// this.options.callback();
						this.container.trigger("end");
					}
				} else if (this.second > 0) {
					this.second = this.second - 1;
					this.msecond = 9;
					this.renderCounter();
					if ((this.options.showMicro) && (this.msecond == 0) && (this.second == 0) && (this.minute == 0) && (this.hour == 0) && (this.day == 0)) {
						clearInterval(this.timer);
						// this.options.callback();
						this.container.trigger("end");
					} else if ((!this.options.showMicro) && (this.second == 0) && (this.minute == 0) && (this.hour == 0) && (this.day == 0)) {
						clearInterval(this.timer);
						// this.options.callback();
						this.container.trigger("end");
					}
				} else if (this.minute > 0) {
					this.minute = this.minute - 1;
					this.msecond = 9;
					this.second = 59;
					this.renderCounter();
				} else if (this.hour > 0) {
					this.hour = this.hour - 1;
					this.msecond = 9;
					this.second = 59;
					this.minute = 59;
					this.renderCounter();
				} else if (this.day > 0) {
					this.day = this.day - 1;
					this.msecond = 9;
					this.second = 59;
					this.minute = 59;
					this.hour = 23;
					this.renderCounter();
				} else {
					this.renderCounter();
					clearInterval(this.timer);
					// this.options.callback();
					this.container.trigger("end");
				}
			},
			run: function() {
				var tmp = function(t) {
					return function() {
						t.calculate();
					}
				}
				this.timer = setInterval(tmp(this), this.interval);
			},
			outer: function() {
				var dd = (this.options.showType == 0) ? '天' : ':';
				var dh = (this.options.showType == 0) ? '时' : ':';
				var dm = (this.options.showType == 0) ? '分' : ':';
				var ds = (this.options.showType == 0) ? '秒' : (this.options.showMicro ? ':' : '');
				var d = this.options.showDay ? ((this.day > 9) ? (this.day + dd) : ('0' + this.day + dd)) : '';
				var h = (this.hour > 9) ? (this.hour + dh) : ('0' + this.hour + dh);
				var m = (this.minute > 9) ? (this.minute + dm) : ('0' + this.minute + dm);
				var s = (this.second > 9) ? (this.second + ds) : ('0' + this.second + ds);
				var ms = this.options.showMicro ? this.msecond : '';
				if (this.options.render && typeof this.options.render === "function") {
					return this.options.render.call(this, this.day, this.hour, this.minute, this.second, this.msecond);
				}
				return d + h + m + s + ms;
			},
			renderCounter: function() {
				$(this.ct).html(this.outer());
			},
			stop: function() {
				window.clearInterval(this.timer);
				this.timer = "";
				delete manageCounterTimer[this.ct];
			},
			restart: function() {
				var self = this;
				if (self.timer) return;
				self.timer = setInterval(function() {
					self.calculate();
				}, this.interval);
			},
			resetTime: function(time) {
				//重置time
				clearInterval(this.timer);
				setTime.call(this, time);
				this.run();
			},
			start: function() {
				this.run();
			},
			on: function() {
				this.container.on(arguments[0], arguments[1], arguments[2]);
			}
		}

		countTime.fn.init.prototype =countTime.prototype;

		return olu.countTimer = countTime;
	}
));