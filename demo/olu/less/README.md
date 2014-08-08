### 样式

---

主要仿照bootstrap的风格，写了一套蘑菇街H5常用的UI kit，

当然，我们也需要有一些规则要遵守的，欢迎拍砖~

---



#### 模块组织规范

H5追求扁平化的样式组织方式，分为三个层级：

1. 基础框架（reset + 公用样式）

2. 通用模块（符合规范的样式模块）

3. 页面样式（继承通用模块）

我们推荐采用上述的层次来组织你的样式文件，在基础框架的基础上开发一定数量的通用模块，
在页面样式模块中继承基础框架和通用模块，并进一步开发。


#### 什么是模块化的样式

对于模块化样式的理解是任何模块在页面上都应该像一个盒模型，不和页面的其他元素互相影响。
    
   - 比如：

     ```html
     <div class="ui-box">
       <h3 class="ui-box-hd"></h3>
       <div class="ui-box-bd"></div>
     </div>
    ```

ui-box 模块能够嵌到页面上任何一个位置，box 内部也能够嵌入别的模块（如图中的 ui-list 模块），它们之间不会互相影响。


值得注意的是：

- 模块名是必选的。

    名字要求是表意的，一眼就基本能看出模块是做什么的。

- 在模块 DOM 结构的最外一层添加状态，而非给每一个内容添加状态。除非内容有独立的状态。

    比如，我们可以这样写：    
    
    ```html
    <div class="ui-box ui-box-red">
       <h3 class="ui-box-hd"></h3>    
       <div class="ui-box-bd"></div>
    </div>
    ```

    但不要这样写：

    ```html    
    <div class="ui-box">
       <h3 class="ui-box-hd ui-box-hd-red"></h3>
       <div class="ui-box-bd ui-box-bd-red"></div>
    </div>
    ```


- 充分考虑标签的语义化


- 用 `-` 来做命名空间上的区隔，模块都使用这样的前缀： `ui-`



#### 写样式的最佳实践

1. 尽量使用公共变量和方法, base下的_variables.less 、_mixins.less

2. 少使用图片，尽量用CSS3实现

3. 放弃 IE 的兼容，当然使用公共方法可以减少很多重复代码

4. 欢迎补充...



#### 现有模块样式

*  Animate  动画 
*  Badges  突出的标签 
*  Buttons  按钮 
*  Form  表单   (单选框、复选框、下拉菜单、文本框、文本域....)
*  Grid   布局 
*  Icons   图标
*  List  列表 (文本)
*  Loading  加载状态
*  Navs  导航表格
*  Panels  面板
*  Tips  提示
*  Empty  没有内容
*  Gotop  回顶部
*  ...
