###  scrollTo组件

| 依赖：Zepto.js

#### 基本用法

触发滚动DOM元素

```html
<a id="goTop" href="javascript:void(0);">To the top, please!</a>
```

然后引入一个脚本

```html
<script type="text/javascript" src="scrollTo.js"></script>
```


#### 调用方法

 * 1、普通调用方法

```javascript

$.scrollTo({
	endY: 0,		         //滚动Y轴坐标值
    duration: 200,	         //滚动持续时间
    callback: function(){    //滚动后执行函数
        console.log("scroll end");
    }
});
```

 * 2、使用require.js

```javascript
var scroll = new scrollTo({
	endY: 0,		         //滚动Y轴坐标值
    duration: 200,	         //滚动持续时间
    callback: function(){    //滚动后执行函数
        console.log("scroll end");
    }
});
```