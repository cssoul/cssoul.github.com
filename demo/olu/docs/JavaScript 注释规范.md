## 总原则

1. **As short as possible（如无必要，勿增注释）**。尽量提高代码本身的清晰性、可读性。
2. **As long as necessary（如有必要，尽量详尽）**。合理的注释、空行排版等，可以让代码更易阅读、更具美感。

总之，注释的目的是：**提高代码的可读性，从而提高代码的可维护性。**


## 什么时候需要添加注释

1. 某段代码的写法，需要注释说明 why 时：

```
// Using loop is more efficient than "rest = slice.call(arguments, 1)".
		
for (i = 1, len = arguments.length; i < len; i++) {
	rest[i - 1] = arguments[i];
}

```


2. 添加上注释，能让代码结构更清晰时：

```
init: function(selector, context, rootjQuery) {
    var match, elem, ret, doc;

    // Handle $(""), $(null), or $(undefined)
    if ( !selector ) {
        ...
    }

    // Handle $(DOMElement)
    if ( selector.nodeType ) {
        ...
    }

    // The body element only exists once, optimize finding it
    if ( typeof selector === "string" ) {
        ...
     }
}
```


3. 有借鉴第三方代码，需要说明时：

```
// Inspired by https://github.com/jquery/jquery/blob/master/src/core.js
function ready() {
    ...
}

```


## 文件起始处的约定

每个文件的开头，包含作者信息、版权信息或开源协议等。for example:
    

```
/*
 * @require: a.js
 *           b.js // 依赖的 js 文件
 * @author: 作者
 * @create: 创建时间
 * @modify: 最后修改时间，对于通用组件不做强制要求。但是对于业务代码，每次修改需写明负责人和时间。
 */

define(function(require, exports, module) {
   	// 源代码
});

```

注意点：

1. 对于业务代码，请添加上作者信息，以便在出问题时，快速找到负责人。
2. 版权信息或开源协议，不做强制要求。
3. 文件最后空一行，可以保证在 combo 合并后，源码的层次清晰。


##  注释书写规范

1. 源码中的注释，推荐用英文。
2. 含有中文时，标点符号用中文全角。
3. 中英文夹杂时，英文与中文之间要用一个空格分开。
4. 注释标识符与注释内容要用一个空格分开：`// 注释` 与 `/* 注释 */`。


## JSDoc 注释

1. 不推荐 JSDoc 式注释，推荐 Backbone 风格的注释。
2. API 请通过 README 等文档表达清楚。
3. 不写 JSDoc 类文档，可以让开发者在写代码时更专注于写代码，在写文档时则更专注于写文档。**让工作解耦，更专注。**
